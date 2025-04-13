import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { ResultShow } from '../models/interfaces/result-show';
import { Pagination } from '../models/interfaces/pagination';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { TmdbTimeWindow } from '../models/types/tmdb-time-window';
import { HttpClient } from '@angular/common/http';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';
import { environment } from '../../../environments/environment.development';
import { TmdbResultShowResponse } from '../models/interfaces/tmdb/tmdb-result-show-response';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { TmdbResultShow } from '../models/classes/tmdb-result-show';

@Injectable({
    providedIn: 'root'
})
export class PopularShowsService {

    private pageSubject$: BehaviorSubject<number> = new BehaviorSubject(1)
    private popularShows$!: Observable<ResultShow[]>
    private paginationResults$: BehaviorSubject<Pagination> = new BehaviorSubject(new PlaceholderPagination())

    protected http: HttpClient = inject(HttpClient)

    constructor() {
        this.popularShows$ = this.pageSubject$.pipe(
            switchMap(page => this.request(page))
        )
    }

    get(page: number = 1): Observable<ResultShow[]> {
        this.pageSubject$.next(page)
        return this.popularShows$
    }

    set(page: number): void {
        this.pageSubject$.next(page)
    }

    getPaginationResults(): Observable<Pagination> {
        return this.paginationResults$.asObservable()
    }

    private request(page: number = 1): Observable<ResultShow[]> {
        const queryBuilder = new SearchQueryBuilder(environment.tmdbApiUrl, `tv/popular`)
        queryBuilder
            .apiKey(environment.tmdbApiKey)
            .page(page)
        const options = {}


        return this.http.get<TmdbResultShowResponse>(queryBuilder.url, options).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results.map(datum => new TmdbResultShow(datum))
            }),
        )
    }

}
