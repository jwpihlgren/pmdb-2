import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, ReplaySubject, switchMap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import MovieDiscoverQueryBuilder from '../models/classes/movie-discover-query-builder.class';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { Pagination } from '../models/interfaces/pagination';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { DiscoverMovieFormValue } from '../models/interfaces/discover-movie-form-value';
import { TmdbResultMovieResponse } from '../models/interfaces/tmdb/tmdb-result-movie-response';
import { TmdbResultMovie } from '../models/classes/tmdb-result-movie';
import { ResultMovie } from '../models/interfaces/result-movie';
import { ParamMap } from '@angular/router';
import { Genre } from '../models/interfaces/genre';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class DiscoverMoviesService {

    protected http = inject(HttpClient)
    protected config = inject(ConfigService)

    private query$: ReplaySubject<{ query: DiscoverMovieFormValue, page?: number }> = new ReplaySubject()
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
        this.query$.next({ query: value, page: page })
    }

    get pagination(): Observable<Pagination> {
        return this.paginationResults$.asObservable()
    }


    keywordsToParams(keywords: string[], operator: "and" | "or"): string {
        const joined = operator === "and" ? keywords.join("|") : keywords.join(",")
        return `?withKeywords=${joined}`
    }


    paramsToKeywords(map: ParamMap): DiscoverMovieFormValue {
        const genres = map.get('genres')
        const adult = map.get('adult')
        const video = map.get('video')
        const releaseDateLte = map.get('releaseDateLte')
        const releaseDateGte = map.get('releaseDateGte')
        const voteAverageLte = map.get('voteAverageLte')
        const voteAverageGte = map.get('voteAveragGGte')
        const withKeywords = map.get('withKeywords')
        const values: DiscoverMovieFormValue = {
            genres: [],
            include: { adult: false, video: false },
            releaseDate: { lte: undefined, gte: undefined },
            voteAverage: { lte: undefined, gte: undefined },
            withKeywords: { keywords: [], pipe: "and" }
        }

        genres?.split(",").forEach(g => {
            const genre = this.config.movieGenres.find(mg => mg.id === +g)
            if (!genre) return
            values.genres.push({ name: genre.name, value: genre.id.toString() })
        })
        if (adult) values.include.adult = adult === "true" ? true : false
        if (video) values.include.video = video === "true" ? true : false
        if (releaseDateLte) values.releaseDate.lte = releaseDateLte

        return values
    }

    private request(params: { query: DiscoverMovieFormValue, page?: number }): Observable<ResultMovie[]> {
        const { include, voteAverage, releaseDate, withKeywords, genres } = params.query
        const page = params.page
        const queryBuilder = new MovieDiscoverQueryBuilder(environment.tmdbApiUrl, "discover/movie")
        queryBuilder
            .apiKey(environment.tmdbApiKey)
            .withGenres(genres.map(g => g.value))
        if (include.adult) queryBuilder.includeAdult(include.adult)
        if (include.video) queryBuilder.includeVideo(include.video)
        if (voteAverage.lte) queryBuilder.voteAverageLte(+voteAverage.lte.value)
        if (voteAverage.gte) queryBuilder.voteAverageGte(+voteAverage.gte.value)
        if (releaseDate.lte) queryBuilder.releaseDateLte([+releaseDate.lte.value, 12, 31])
        if (releaseDate.gte) queryBuilder.releaseDateGte([+releaseDate.gte.value, 1, 1])
        if (withKeywords.keywords.length > 0) queryBuilder.withKeywords(withKeywords.keywords.map(k => k.value), withKeywords.pipe)
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
