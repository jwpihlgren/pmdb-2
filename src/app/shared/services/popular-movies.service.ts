import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Pagination } from '../models/interfaces/pagination';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { TmdbTimeWindow } from '../models/types/tmdb-time-window';
import { HttpClient } from '@angular/common/http';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { TmdbResultMovieResponse } from '../models/interfaces/tmdb/tmdb-result-movie-response';
import { TmdbResultMovie } from '../models/classes/tmdb-result-movie';
import { ResultMovie } from '../models/interfaces/result-movie';

@Injectable({
    providedIn: 'root',
})
export class PopularMoviesService {
    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey
    private pageSubject$: BehaviorSubject<number> = new BehaviorSubject(1)
    private popularMovies$!: Observable<ResultMovie[]>
    private paginationResults$: BehaviorSubject<Pagination> = new BehaviorSubject(new PlaceholderPagination())
    private callerTimeWindow?: TmdbTimeWindow
    protected http: HttpClient = inject(HttpClient)

    constructor() {
        this.popularMovies$ = this.pageSubject$.pipe(
            switchMap(page => this.request(page, this.callerTimeWindow))
        )
    }

    get(page: number = 1, timeWindow?: TmdbTimeWindow): Observable<ResultMovie[]> {
        if (timeWindow) {
            this.callerTimeWindow = timeWindow
        }
        this.pageSubject$.next(page)
        return this.popularMovies$
    }

    set(page: number): void {
        this.pageSubject$.next(page)
    }

    getPaginationResults(): Observable<Pagination> {
        return this.paginationResults$.asObservable()
    }

    private request(page: number = 1, timeWindow: TmdbTimeWindow = "day"): Observable<ResultMovie[]> {
        const endpoint = `movie/popular`
        const queryParams = `?api_key=${this.apikey}&page=${page}`
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<TmdbResultMovieResponse>(url, options).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results.map(datum => new TmdbResultMovie(datum))
            }),
        )
    }
}
