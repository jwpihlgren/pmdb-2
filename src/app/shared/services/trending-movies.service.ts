import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Pagination } from '../models/interfaces/pagination';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { TmdbTimeWindow } from '../models/types/tmdb-time-window';
import { TmdbResultMovie } from '../models/classes/tmdb-result-movie';
import { TmdbResultMovieResponse } from '../models/interfaces/tmdb/tmdb-result-movie-response';
import { ResultMovie } from '../models/interfaces/result-movie';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';

@Injectable({
    providedIn: 'root'
})
export class TrendingMoviesService {

    private pageSubject$: BehaviorSubject<number> = new BehaviorSubject(1)
    private trendingMovies$!: Observable<ResultMovie[]>
    private paginationResults$: BehaviorSubject<Pagination> = new BehaviorSubject(new PlaceholderPagination())
    private callerTimeWindow?: TmdbTimeWindow

    protected http: HttpClient = inject(HttpClient)

    constructor() {
        this.trendingMovies$ = this.pageSubject$.pipe(
            switchMap(page => this.request(page, this.callerTimeWindow))
        )
    }

    get(page: number = 1, timeWindow?: TmdbTimeWindow): Observable<ResultMovie[]> {
        if (timeWindow) {
            this.callerTimeWindow = timeWindow
        }
        this.pageSubject$.next(page)
        return this.trendingMovies$
    }

    set(page: number): void {
        this.pageSubject$.next(page)
    }

    getPaginationResults(): Observable<Pagination> {
        return this.paginationResults$.asObservable()
    }

    private request(page: number = 1, timeWindow: TmdbTimeWindow = "day"): Observable<ResultMovie[]> {
        const queryBuilder = new SearchQueryBuilder(environment.tmdbApiUrl, `trending/movie/${timeWindow}`)
        queryBuilder
            .apiKey(environment.tmdbApiKey)
            .page(page)
        const options = {}


        return this.http.get<TmdbResultMovieResponse>(queryBuilder.url, options).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results.map(datum => new TmdbResultMovie(datum))
            }),
        )
    }
}
