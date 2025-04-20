import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, ReplaySubject, switchMap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import MovieDiscoverQueryBuilder from '../models/classes/movie-discover-query-builder.class';
import MovieFilters from '../models/interfaces/movie-filters';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { Pagination } from '../models/interfaces/pagination';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { DiscoverMovieFormValue } from '../models/interfaces/discover-movie-form-value';
import { TmdbResultMovieResponse } from '../models/interfaces/tmdb/tmdb-result-movie-response';
import { TmdbResultMovie } from '../models/classes/tmdb-result-movie';
import { ResultMovie } from '../models/interfaces/result-movie';

@Injectable({
    providedIn: 'root'
})
export class DiscoverMoviesService {

    protected http = inject(HttpClient)

    private query$: ReplaySubject<{query: DiscoverMovieFormValue, page?: number}> = new ReplaySubject()
    private paginationResults$ = new BehaviorSubject<Pagination>(new PlaceholderPagination())
    results$: Observable<ResultMovie[]>

    constructor() {
        this.results$ = this.query$.pipe(
            switchMap(data => {
                return this.request(data)
            })
        )
    }

    discover(value: DiscoverMovieFormValue, page?: number): void {
        this.query$.next({query: value, page: page})
    }

    get pagination(): Observable<Pagination> {
        return this.paginationResults$.asObservable()
    }

    private request(params: {query: DiscoverMovieFormValue, page?: number}): Observable<ResultMovie[]> {
        const value = params.query
        const page = params.page 
        const genres: string[] = value.genres?.map( value => value.toString()) || []
        const queryBuilder = new MovieDiscoverQueryBuilder(environment.tmdbApiUrl, "discover/movie")
        queryBuilder
            .apiKey(environment.tmdbApiKey)
            .withGenres(genres)
        if (value.include.adult !== null) queryBuilder.includeAdult(value.include.adult)
        if (value.include.video !== null) queryBuilder.includeVideo(value.include.video)
        if (value.voteAverage.lte && value.voteAverage.lte.length > 0) queryBuilder.voteAverageLte(value.voteAverage.lte[0])
        if (value.voteAverage.gte && value.voteAverage.gte.length > 0) queryBuilder.voteAverageGte(value.voteAverage.gte[0])
        if (value.releaseDate.lte) queryBuilder.releaseDateLte([+value.releaseDate.lte, 12, 31])
        if (value.releaseDate.gte) queryBuilder.releaseDateGte([+value.releaseDate.gte, 1, 1])
        queryBuilder.page(page)
        const options = {}

        return this.http.get<TmdbResultMovieResponse>(queryBuilder.url, options).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results.map(datum => new TmdbResultMovie(datum))
            }),
        )
    }
}
