import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import MovieDiscoverQueryBuilder from '../models/classes/movie-discover-query-builder.class';
import MovieFilters from '../models/interfaces/movie-filters';
import { MovieDiscoverFormValue } from '../models/interfaces/movie-discover-form-value';
import { TrendingMovie } from '../models/interfaces/trending-movie';
import { TmdbTrendingMovie } from '../models/classes/tmdb-trending-movie';
import { TmdbTrendingMovies } from '../models/interfaces/tmdb/tmdb-trending-movies';

@Injectable({
    providedIn: 'root'
})
export class DiscoverMoviesService {
    protected http = inject(HttpClient)

    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey

    private movieQueryBuilder: MovieFilters = new MovieDiscoverQueryBuilder()
    private query$: ReplaySubject<MovieDiscoverFormValue> = new ReplaySubject()
    results$: Observable<TrendingMovie[]>

    constructor() {
        this.results$ = this.query$.pipe(
            switchMap(data => {
                return this.request(data)
            })
        )
    }

    discover(value: MovieDiscoverFormValue): void {
        this.query$.next(value)
    }

    private request(value: MovieDiscoverFormValue): Observable<TrendingMovie[]> {
        const endpoint = `discover/movie`

        const genres: string[] = value.genres?.map( value => value.toString()) || []
        console.log(genres)
        this.movieQueryBuilder.withGenres(genres)
        if (value.include.adult !== null) this.movieQueryBuilder.includeAdult(value.include.adult)
        if (value.include.video !== null) this.movieQueryBuilder.includeVideo(value.include.video)
        if (value.voteAverage.lte) this.movieQueryBuilder.voteAverageLte(value.voteAverage.lte)
        if (value.voteAverage.gte) this.movieQueryBuilder.voteAverageGte(value.voteAverage.gte)
        if (value.releaseDate.lte) this.movieQueryBuilder.releaseDateLte([+value.releaseDate.lte, 12, 31])
        if (value.releaseDate.gte) this.movieQueryBuilder.releaseDateGte([+value.releaseDate.gte, 1, 1])
        let queryParams = this.movieQueryBuilder.getQuery()
        console.log(queryParams)
        queryParams = queryParams + `&api_key=${this.apikey}`
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<TmdbTrendingMovies>(url, options).pipe(
            map(data => {
                return data.results.map(datum => new TmdbTrendingMovie(datum))
            }),
        )
    }
}
