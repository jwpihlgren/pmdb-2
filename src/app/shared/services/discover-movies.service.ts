import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, ReplaySubject, switchMap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import MovieDiscoverQueryBuilder from '../models/classes/movie-discover-query-builder.class';
import MovieFilters from '../models/interfaces/movie-filters';
import { MovieDiscoverFormValue } from '../models/interfaces/movie-discover-form-value';
import { TrendingMovie } from '../models/interfaces/trending-movie';
import { TmdbTrendingMovie } from '../models/classes/tmdb-trending-movie';
import { TmdbTrendingMovies } from '../models/interfaces/tmdb/tmdb-trending-movies';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { Pagination } from '../models/interfaces/pagination';
import { TmdbPagination } from '../models/classes/tmdb-pagination';

@Injectable({
    providedIn: 'root'
})
export class DiscoverMoviesService {
    protected http = inject(HttpClient)

    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey

    private movieQueryBuilder: MovieFilters = new MovieDiscoverQueryBuilder()
    private query$: ReplaySubject<{query: MovieDiscoverFormValue, page?: number}> = new ReplaySubject()
    private paginationResults$ = new BehaviorSubject<Pagination>(new PlaceholderPagination())
    results$: Observable<TrendingMovie[]>

    constructor() {
        this.results$ = this.query$.pipe(
            switchMap(data => {
                return this.request(data)
            })
        )
    }

    discover(value: MovieDiscoverFormValue, page?: number): void {
        this.query$.next({query: value, page: page})
    }

    get pagination(): Observable<Pagination> {
        return this.paginationResults$.asObservable()
    }

    private request(params: {query: MovieDiscoverFormValue, page?: number}): Observable<TrendingMovie[]> {
        const endpoint = `discover/movie`
        const value = params.query
        const page = params.page 
        const genres: string[] = value.genres?.map( value => value.toString()) || []
        this.movieQueryBuilder.apiKey(environment.tmdbApiKey)
        this.movieQueryBuilder.withGenres(genres)
        if (value.include.adult !== null) this.movieQueryBuilder.includeAdult(value.include.adult)
        if (value.include.video !== null) this.movieQueryBuilder.includeVideo(value.include.video)
        if (value.voteAverage.lte && value.voteAverage.lte.length > 0) this.movieQueryBuilder.voteAverageLte(value.voteAverage.lte[0])
        if (value.voteAverage.gte && value.voteAverage.gte.length > 0) this.movieQueryBuilder.voteAverageGte(value.voteAverage.gte[0])
        if (value.releaseDate.lte) this.movieQueryBuilder.releaseDateLte([+value.releaseDate.lte, 12, 31])
        if (value.releaseDate.gte) this.movieQueryBuilder.releaseDateGte([+value.releaseDate.gte, 1, 1])
        this.movieQueryBuilder.page(page)
        let queryParams = this.movieQueryBuilder.getQuery()
        console.log(queryParams)
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
