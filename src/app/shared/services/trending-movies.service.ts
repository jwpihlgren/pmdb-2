import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TrendingMovie } from '../models/interfaces/trending-movie';
import { TmdbTrendingMovies } from '../models/interfaces/tmdb/tmdb-trending-movies';
import { TmdbTrendingMovie } from '../models/classes/tmdb-trending-movie';
import { Pagination } from '../models/interfaces/pagination';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { TmdbTimeWindow } from '../models/types/tmdb-time-window';

@Injectable({
    providedIn: 'root'
})
export class TrendingMoviesService {

    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey
    private pageSubject$: BehaviorSubject<number> = new BehaviorSubject(1)
    private trendingMovies$!: Observable<TrendingMovie[]>
    private paginationResults$: BehaviorSubject<Pagination> = new BehaviorSubject(new PlaceholderPagination())
    private callerTimeWindow?: TmdbTimeWindow

    constructor(private http: HttpClient) {
        this.trendingMovies$ = this.pageSubject$.pipe(
            switchMap(page => this.request(page, this.callerTimeWindow))
        )
    }

    get(page: number = 1, timeWindow?: TmdbTimeWindow): Observable<TrendingMovie[]> {
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

   private request(page: number = 1, timeWindow: TmdbTimeWindow = "day"): Observable<TrendingMovie[]> {
        const endpoint = `trending/movie/${timeWindow}`
        const queryParams = `?api_key=${this.apikey}&page=${page}`
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<TmdbTrendingMovies>(url, options).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results.map(datum => new TmdbTrendingMovie(datum))
            }),
        )
    }
}
