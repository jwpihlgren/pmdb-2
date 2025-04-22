import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { debounceTime, map, Observable, ReplaySubject as BehaviorSubject, switchMap, of } from 'rxjs';
import ResultMulti from './models/interfaces/result-multi';
import { environment } from '../../environments/environment.development';
import SearchQueryBuilder from './models/classes/movie-search-query-builder.class';
import TmdbResultMultiResponse from './models/interfaces/tmdb/tmdb-result-multi-response';
import { TmdbResultPeopleResponse } from './models/interfaces/tmdb/tmdb-search-people-response';
import { TmdbResultShowResponse } from './models/interfaces/tmdb/tmdb-result-show-response';
import { TmdbResultMovieResponse } from './models/interfaces/tmdb/tmdb-result-movie-response';

@Injectable({
    providedIn: 'root'
})
export class SearchMultiService {

    http: HttpClient = inject(HttpClient)

    private _search: BehaviorSubject<string | undefined> = new BehaviorSubject(undefined)
    searchResults$: Observable<ResultMulti[] | undefined>

    constructor() {
        this.searchResults$ = this._search.pipe(
            debounceTime(100),
            switchMap(query => {
                if (query === undefined || query === "") {
                    return of(undefined)
                }
                return this.request(query)
            })
        )
    }

    find(query: string): void {
        this._search.next(query)
    }

    clear(): void {
        this._search.next(undefined)
    }


    private request(query: string): Observable<ResultMulti[]> {
        const queryBuilder = new SearchQueryBuilder(environment.tmdbApiUrl, "search/multi")
        queryBuilder
            .apiKey(environment.tmdbApiKey)
            .searchQuery(query)
        const options = {}

        return this.http.get<TmdbResultMultiResponse>(queryBuilder.url, options).pipe(
            map(data => {
                return data.results.map(result => new TmdbResultMulti(result))
            })
        )

    }
}

class TmdbResultMulti implements ResultMulti {
    endDate?: string
    id!: number
    mediaType!: string;
    name!: string
    originalLanguage!: string
    originalName!: string
    overview!: string
    popularity!: number
    posterPath!: string
    releaseDate!: string
    stub!: "people" | "movies" | "shows"


    constructor(raw: TmdbResultMultiResponse["results"][0]) {


        if (raw.media_type === "tv") Object.assign(this, this.parseShow(raw))
        else if (raw.media_type === "movie") Object.assign(this, this.parseMovie(raw))
        else Object.assign(this, this.parsePerson(raw))
    }

    parsePerson(raw: TmdbResultMultiResponse["results"][0]): ResultMulti {
        raw = raw as TmdbResultPeopleResponse["results"][0]
        return {
            id: raw.id,
            name: raw.name,
            mediaType: raw.media_type,
            originalName: raw.name,
            overview: raw.known_for_department ?? "",
            popularity: raw.popularity,
            posterPath: raw.profile_path ?? "",
            stub: "people"
        }
    }
    parseShow(raw: TmdbResultMultiResponse["results"][0]): ResultMulti {
        raw = raw as TmdbResultShowResponse["results"][0]
        return {
            id: raw.id,
            name: raw.name,
            mediaType: raw.media_type,
            originalLanguage: raw.original_language,
            originalName: raw.original_name,
            overview: raw.overview,
            popularity: raw.popularity,
            posterPath: raw.poster_path ?? "",
            releaseDate: raw.first_air_date,
            stub: "shows"
        }
    }
    parseMovie(raw: TmdbResultMultiResponse["results"][0]): ResultMulti {

        raw = raw as TmdbResultMovieResponse["results"][0]
        return {
            id: raw.id,
            name: raw.title,
            mediaType: raw.media_type,
            originalLanguage: raw.original_language,
            originalName: raw.original_title,
            overview: raw.overview,
            popularity: raw.popularity,
            posterPath: raw.poster_path ?? "",
            releaseDate: raw.release_date,
            stub: "movies"
        }
    }
}


