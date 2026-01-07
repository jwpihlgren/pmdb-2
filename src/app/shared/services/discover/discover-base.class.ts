import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { BehaviorSubject, Observable, Subject, take } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { FilterFormAdapter, FormValues } from "../../adapters/filterForm/filterForm.adapter";
import { FilterUrlAdapter } from "../../adapters/filterUrl/filter-url.adapter";
import { FilterAdapter } from "../../adapters/tmdb/tmdb-filter-adapter.types";
import { FilterSet, FilterDefinitions, Filter } from "../../models/filter.model";
import { DiscoverService, DiscoverRequestStrategy, DiscoverResult } from "./discover.types";

export abstract class DiscoverBaseService<K extends Record<string, unknown>, T> implements DiscoverService<K, T> {
    private readonly filters_: BehaviorSubject<FilterSet<K>>;
    readonly filters: Observable<FilterSet<K>>;

    protected abstract readonly defintions: FilterDefinitions<K>
    protected abstract filterFormAdapter: FilterFormAdapter<Record<keyof K, Filter | undefined>>
    protected abstract requestStrategy: DiscoverRequestStrategy<Record<string, string>, T>
    protected abstract http: HttpClient

    protected results$: Subject<DiscoverResult<T>> = new Subject()
    private router = inject<Router>(Router)

    private lastAdoptedUrlKey: string | null = null;
    private lastRequestedKey: string | null = null;

    constructor(
        private readonly filterSetKeys: Record<string, string>,
        protected externalAdapter: FilterAdapter<K, Record<string, string>>
    ) {
        const initial = this.createFilterSet(filterSetKeys);
        this.filters_ = new BehaviorSubject<FilterSet<K>>(initial);
        this.filters = this.filters_.asObservable();
    }

    get results(): Observable<DiscoverResult<T>> {
        return this.results$.asObservable()
    }

    setFilters(formValues: FormValues<K>): void {
        const filterSet = this.filterFormAdapter.decode(formValues);
        const nextKey = this.toCanonicalUrlKey(filterSet);
        if (this.lastAdoptedUrlKey === nextKey) return;

        const queryParams = FilterUrlAdapter.encode(filterSet);
        this.router.navigate([], { queryParams });
    }

    adoptFromUrl(route: ActivatedRouteSnapshot, form: FormGroup): void {
        const paramMap = route.queryParamMap;
        if (!paramMap) return;

        const newEmptyFilterSet = this.createFilterSet(this.filterSetKeys);
        const parseResult = FilterUrlAdapter.decode(paramMap, this.defintions, newEmptyFilterSet);

        if (parseResult.structuralErrors.length > 0) {
            this.router.navigate([], {
                queryParams: FilterUrlAdapter.encode(this.createFilterSet(this.filterSetKeys)),
                replaceUrl: true
            });
            return;
        }
        const filterSet = parseResult.filterSet;

        const adoptedUrlKey = this.toCanonicalUrlKey(filterSet);

        if (this.lastAdoptedUrlKey === adoptedUrlKey) {
            return;
        }
        this.lastAdoptedUrlKey = adoptedUrlKey;

        this.filters_.next(filterSet);

        this.filterFormAdapter.encode(filterSet, form);

        if (this.lastRequestedKey !== adoptedUrlKey) {
            this.lastRequestedKey = adoptedUrlKey;
            this.request(filterSet);
        }
    }

    private createFilterSet(keys: Record<string, string>): FilterSet<K> {
        return Object
            .fromEntries(Object.keys(keys).map(k => [k, undefined])) as FilterSet<K>;
    }

    private toCanonicalUrlKey(filterSet: FilterSet<K>): string {
        const qp = FilterUrlAdapter.encode(filterSet);

        const keys = Object.keys(qp).sort();
        const normalized = keys.map(k => {
            const v = qp[k];
            const values = Array.isArray(v) ? [...v].map(String).sort() : [String(v)];
            return `${k}=${values.join(",")}`;
        });

        return normalized.join("&");
    }


    private request(filterSet: FilterSet<K>): void {
        const { result, errors } = this.externalAdapter.encode(filterSet);
        if (errors.length) {
            console.warn(errors);
            return;
        }

        const url = new URL(this.requestStrategy.endpoint, environment.tmdbApiUrl);

        // api_key can be appended here once, consistently
        let params = this.requestStrategy.toHttpParams(result).set("api_key", environment.tmdbApiKey);

        this.requestStrategy.execute$(url, params)
            .pipe(take(1))
            .subscribe(res => this.results$.next(
                {
                    pagination: res.pagination,
                    result: res.result
                }
            ));
    }
}
