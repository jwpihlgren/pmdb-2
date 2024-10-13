import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { TrendingShow } from '../models/interfaces/trending-show';
import { Pagination } from '../models/interfaces/pagination';
import { TmdbTimeWindow } from '../models/types/tmdb-time-window';
import { environment } from '../../../environments/environment.development';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { HttpClient } from '@angular/common/http';
import { TmdbTrendingShows } from '../models/interfaces/tmdb/tmdb-trending-shows';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { TmdbTrendingShow } from '../models/classes/tmdb-trending-show';

@Injectable({
    providedIn: 'root'
})
export class TrendingShowsService {

    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey
    private pageSubject$: BehaviorSubject<number> = new BehaviorSubject(1)
    private trendingShows$!: Observable<TrendingShow[]>
    private paginationResults$: BehaviorSubject<Pagination> = new BehaviorSubject(new PlaceholderPagination())
    private callerTimeWindow?: TmdbTimeWindow

    constructor(private http: HttpClient) {
        this.trendingShows$ = this.pageSubject$.pipe(
            switchMap(page => this.request(page, this.callerTimeWindow))
        )
    }

    get(page: number = 1, timeWindow?: TmdbTimeWindow): Observable<TrendingShow[]> {
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

    private request(page: number, timeWindow: TmdbTimeWindow = "day"): Observable<TrendingShow[]> {
        const endpoint = `trending/tv/${timeWindow}`
        const queryParams = `?api_key=${this.apikey}&page=${page}`
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<TmdbTrendingShows>(url, options).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results.map(datum => new TmdbTrendingShow(datum))
            })
        )
    }
}
