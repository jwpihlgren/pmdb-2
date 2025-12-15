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

    updatedDiscoverUrl(formvalues: DiscoverMovieFormValue, page?: number): string {
        const queryBuilder = new MovieDiscoverQueryBuilder("", "movies/discover")

        return this.createQueryUrl(queryBuilder, formvalues, page)
    }


    paramsToFormValues(map: ParamMap | undefined): DiscoverMovieFormValue {
        const values: DiscoverMovieFormValue = {
            genres: [],
            include: { adult: false, video: false },
            releaseDate: { lte: undefined, gte: undefined },
            voteAverage: { lte: undefined, gte: undefined },
            withKeywords: { keywords: [], pipe: "and" }
        }

        if (!map) return values
        const genres = map.get('with_genres')
        const adult = map.get('adult')
        const video = map.get('video')
        const releaseDateLte = map.get('releaseDateLte')
        const releaseDateGte = map.get('releaseDateGte')
        const voteAverageLte = map.get('voteAverageLte')
        const voteAverageGte = map.get('voteAverageGte')
        const withKeywords = map.get('withKeyword')

        genres?.split(",").forEach(g => {
            const genre = this.config.movieGenres.find(mg => mg.id.toString() === g)

            if (!genre) return
            values.genres.push(genre.id)
        })
        if (adult) values.include.adult = adult === "true" ? true : false
        if (video) values.include.video = video === "true" ? true : false
        if (releaseDateLte) values.releaseDate.lte = releaseDateLte
        if (releaseDateGte) values.releaseDate.gte = releaseDateGte
        if (voteAverageLte) values.voteAverage.lte = voteAverageLte
        if (voteAverageGte) values.voteAverage.gte = voteAverageGte
        if (withKeywords) {
            const withKeywordsAnd = withKeywords.split(",")
            const withKeywordsOr = withKeywords.split("|")
            const list = withKeywordsAnd.length >= withKeywordsOr.length ? withKeywordsAnd : withKeywordsOr
            const pipe = withKeywordsAnd.length >= withKeywordsOr.length ? "and" : "or"

            values.withKeywords.keywords = list
            values.withKeywords.pipe = pipe
        }
        return values
    }

    private request(params: { query: DiscoverMovieFormValue, page?: number }): Observable<ResultMovie[]> {

        const queryBuilder = new MovieDiscoverQueryBuilder(environment.tmdbApiUrl, "discover/movie")
            .apiKey(environment.tmdbApiKey)
        const url = this.createQueryUrl(queryBuilder, params.query, params.page)
        const options = {}

        return this.http.get<TmdbResultMovieResponse>(url, options).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results.map(datum => new TmdbResultMovie(datum))
            }),
        )
    }

    private createQueryUrl(queryBuilder: MovieDiscoverQueryBuilder, formValues: DiscoverMovieFormValue, page?: number): string {
        const { include, voteAverage, releaseDate, withKeywords, genres } = formValues
        queryBuilder
            .withGenres(genres)
        if (include.adult) queryBuilder.includeAdult(include.adult)
        if (include.video) queryBuilder.includeVideo(include.video)
        if (voteAverage.lte) queryBuilder.voteAverageLte(+voteAverage.lte)
        if (voteAverage.gte) queryBuilder.voteAverageGte(+voteAverage.gte)
        if (releaseDate.lte) queryBuilder.releaseDateLte([+releaseDate.lte, 12, 31])
        if (releaseDate.gte) queryBuilder.releaseDateGte([+releaseDate.gte, 1, 1])
        if (withKeywords.keywords.length > 0) queryBuilder.withKeywords(withKeywords.keywords, withKeywords.pipe)
        queryBuilder.page(page)

        return queryBuilder.url

    }
}
