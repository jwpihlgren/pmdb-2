import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { Pagination } from '../models/interfaces/pagination';
import { TmdbTimeWindow } from '../models/types/tmdb-time-window';
import { environment } from '../../../environments/environment.development';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { HttpClient } from '@angular/common/http';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { ResultShow } from '../models/interfaces/result-show';
import { TmdbResultShowResponse } from '../models/interfaces/tmdb/tmdb-result-show-response';
import { TmdbResultShow } from '../models/classes/tmdb-result-show';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';

@Injectable({
    providedIn: 'root'
})
export class TrendingShowsService {

    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey
    private pageSubject$: BehaviorSubject<number> = new BehaviorSubject(1)
    private trendingShows$!: Observable<ResultShow[]>
    private paginationResults$: BehaviorSubject<Pagination> = new BehaviorSubject(new PlaceholderPagination())
    private callerTimeWindow?: TmdbTimeWindow
    protected http: HttpClient = inject(HttpClient)

    constructor() {
        this.trendingShows$ = this.pageSubject$.pipe(
            switchMap(page => this.request(page, this.callerTimeWindow))
        )
    }

    get(page: number = 1, timeWindow?: TmdbTimeWindow): Observable<ResultShow[]> {
        if (timeWindow) {
            this.callerTimeWindow = timeWindow
        }

        this.pageSubject$.next(page)
        return this.trendingShows$
    }

    set(page: number) {
        this.pageSubject$.next(page)
    }

    getPaginationResults(): Observable<Pagination> {
        return this.paginationResults$.asObservable()
    }

    private request(page: number, timeWindow: TmdbTimeWindow = "day"): Observable<ResultShow[]> {
        const options = {}

        const queryBuilder = new SearchQueryBuilder(environment.tmdbApiUrl, `trending/tv/${timeWindow}`)
        queryBuilder
            .apiKey(environment.tmdbApiKey)
            .page(page)

        return this.http.get<TmdbResultShowResponse>(queryBuilder.url, options).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results.map(datum => new TmdbResultShow(datum))
            })
        )
    }
}
