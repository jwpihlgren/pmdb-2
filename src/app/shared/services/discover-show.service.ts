import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, switchMap } from 'rxjs';
import { DiscoverShowFormValue } from '../models/interfaces/discover-show-form-value';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { Pagination } from '../models/interfaces/pagination';
import { ResultShow } from '../models/interfaces/result-show';
import { TmdbResultShowResponse } from '../models/interfaces/tmdb/tmdb-result-show-response';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { environment } from '../../../environments/environment';
import { TmdbResultShow } from '../models/classes/tmdb-result-show';
import ShowDiscoverQueryBuilder from '../models/classes/show-discover-query-builder.class';

@Injectable({
    providedIn: 'root'
})
export class DiscoverShowService {
    protected http = inject(HttpClient)

    private query$: ReplaySubject<{ query: DiscoverShowFormValue, page?: number }> = new ReplaySubject()
    private paginationResults$ = new BehaviorSubject<Pagination>(new PlaceholderPagination())
    results$: Observable<ResultShow[]>

    constructor() {
        this.results$ = this.query$.pipe(
            switchMap(data => {
                return this.request(data)
            })
        )
    }

    discover(value: DiscoverShowFormValue, page?: number): void {
        this.query$.next({ query: value, page: page })
    }

    get pagination(): Observable<Pagination> {
        return this.paginationResults$.asObservable()
    }

    private request(params: { query: DiscoverShowFormValue, page?: number }): Observable<ResultShow[]> {
        const value = params.query
        const page = params.page
        const genres: string[] = value.genres?.map(value => value.toString()) || []
        const queryBuilder = new ShowDiscoverQueryBuilder(environment.tmdbApiUrl, "discover/tv")
        queryBuilder
            .apiKey(environment.tmdbApiKey)
            .withGenres(genres)
        if (value.include.adult !== null) queryBuilder.includeAdult(value.include.adult)
        if (value.include.video !== null) queryBuilder.includeVideo(value.include.video)
        if (value.voteAverage.lte && value.voteAverage.lte.length > 0) queryBuilder.voteAverageLte(value.voteAverage.lte[0])
        if (value.voteAverage.gte && value.voteAverage.gte.length > 0) queryBuilder.voteAverageGte(value.voteAverage.gte[0])
        if (value.firstAirDate.lte) queryBuilder.firstAirDateLte([+value.firstAirDate.lte, 12, 31])
        if (value.firstAirDate.gte) queryBuilder.firstAirDateGte([+value.firstAirDate.gte, 1, 1])
        queryBuilder.page(page)
        const options = {}

        return this.http.get<TmdbResultShowResponse>(queryBuilder.url, options).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results.map(datum => new TmdbResultShow(datum))
            }),
        )
    }
}
