import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, Subject, take, tap, } from 'rxjs';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { TmdbResultMovieResponse } from '../models/interfaces/tmdb/tmdb-result-movie-response';
import { TmdbResultMovie } from '../models/classes/tmdb-result-movie';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Pagination } from '../models/interfaces/pagination';
import { ResultMovie } from '../models/interfaces/result-movie';
import { DiscoverMovieFilterDefinitions } from './tmdb-discover-movie-filter-config.service';
import { FilterDefinitions, FilterSet } from '../models/filter.model';
import { HttpClient } from '@angular/common/http';
import { discoverMovieFilters, DiscoverMovieFilters } from '../models/interfaces/discover-movie-filters';
import { FilterUrlAdapter } from '../adapters/filterUrl/filter-url.adapter';
import { UrlBuilder } from '../models/classes/url-builder/url-builder';
import { TmdbDiscoverMovieAdapter } from '../adapters/tmdb/tmdb-discover-movie-filter.adapter';
import { FilterFormAdapter, FormValues } from '../adapters/filterForm/filterForm.adapter';
import { FormGroup } from '@angular/forms';

export interface DiscoverMovieResult { result: ResultMovie[], pagination: Pagination }

@Injectable({
    providedIn: 'root'
})
export class DiscoverMoviesService {

    private readonly filters_ = new BehaviorSubject<DiscoverMovieFilters>(this.createFilterSet())
    readonly filters = this.filters_.asObservable()
    private readonly defintions: FilterDefinitions<DiscoverMovieFilters> = inject(DiscoverMovieFilterDefinitions)
    private http: HttpClient = inject(HttpClient)
    private router: Router = inject(Router)
    private results$: Subject<DiscoverMovieResult> = new Subject<DiscoverMovieResult>()
    private tmdbAdapter = new TmdbDiscoverMovieAdapter()
    private readonly filterFormAdapter = new FilterFormAdapter<DiscoverMovieFilters>(this.defintions)
    // Dedupe keys (URL is source of truth)
    private lastAdoptedUrlKey: string | null = null;
    private lastRequestedKey: string | null = null;
    private inFlight?: import('rxjs').Subscription;


    constructor() { }

    get results(): Observable<DiscoverMovieResult> {
        return this.results$.asObservable()
    }

    private createFilterSet(): DiscoverMovieFilters {
        return Object
            .fromEntries(Object
                .keys(discoverMovieFilters)
                .map(k => [k, undefined])
            ) as DiscoverMovieFilters
    }

    setFilters(formValues: FormValues<DiscoverMovieFilters>): void {
        const filterSet = this.filterFormAdapter.decode(formValues);
        const nextKey = this.toCanonicalUrlKey(filterSet);
        if (this.lastAdoptedUrlKey === nextKey) return;

        const queryParams = FilterUrlAdapter.encode(filterSet);
        this.router.navigate([], { queryParams });
    }


    adoptFromUrl(route: ActivatedRouteSnapshot, form: FormGroup): void {
        const paramMap = route.queryParamMap;
        if (!paramMap) return;

        // URL -> FilterSet (starting from a clean base)
        const base = this.createFilterSet();
        const parseResult = FilterUrlAdapter.decode(paramMap, this.defintions, base);

        // If URL is structurally invalid, repair URL and exit.
        // The subsequent URL emission will call adoptFromUrl again with repaired params.
        if (parseResult.structuralErrors.length > 0) {
            this.router.navigate([], {
                queryParams: FilterUrlAdapter.encode(this.createFilterSet()),
                replaceUrl: true
            });
            return;
        }
        const filterSet = parseResult.filterSet;

        // Build a stable key that represents the URL-equivalent state.
        // We canonicalize via encoded query params sorted by key + values.
        const adoptedUrlKey = this.toCanonicalUrlKey(filterSet);

        // If we've already adopted this exact URL state, do nothing (prevents loops).
        if (this.lastAdoptedUrlKey === adoptedUrlKey) {
            return;
        }
        this.lastAdoptedUrlKey = adoptedUrlKey;

        // Update internal state (for other consumers / UI)
        this.filters_.next(filterSet);

        // Patch form to reflect URL (make sure your adapter uses emitEvent: false internally if needed)
        this.filterFormAdapter.encode(filterSet, form);

        // Trigger request exactly once per effective filter set
        if (this.lastRequestedKey !== adoptedUrlKey) {
            this.lastRequestedKey = adoptedUrlKey;
            this.request(filterSet);
        }
    }

    private request(filterSet: FilterSet<DiscoverMovieFilters>): void {
        this.inFlight?.unsubscribe();

        const { result } = this.tmdbAdapter.encode(filterSet);

        const urlBuilder = UrlBuilder.new(`${environment.tmdbApiUrl}discover/movie`)
            .setParam("api_key", environment.tmdbApiKey);

        const params = Object.entries(result)
            .filter(([k, v]) => k && v !== undefined && v !== null && String(v).trim() !== "")
            .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
            .join("&");

        if (params) {
            urlBuilder.appendParams(params);
        }

        const url = urlBuilder.build();

        this.inFlight = this.http.get<TmdbResultMovieResponse>(url).pipe(
            tap(data => {
                this.results$.next({
                    result: data.results.map(d => new TmdbResultMovie(d)),
                    pagination: new TmdbPagination(data)
                });
            }),
            take(1)
        ).subscribe();
    }

    private toCanonicalUrlKey(filterSet: FilterSet<DiscoverMovieFilters>): string {
        const qp = FilterUrlAdapter.encode(filterSet);

        const keys = Object.keys(qp).sort();
        const normalized = keys.map(k => {
            const v = qp[k];
            const values = Array.isArray(v) ? [...v].map(String).sort() : [String(v)];
            return `${k}=${values.join(",")}`;
        });

        return normalized.join("&");
    }
}


