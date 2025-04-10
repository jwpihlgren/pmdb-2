import { inject, Injectable } from '@angular/core';
import SearchQueryBuilderl from '../models/classes/movie-search-query-builder.class';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TmdbResultMovieResponse } from '../models/interfaces/tmdb/tmdb-result-movie-response';
import { ResultMovie } from '../models/interfaces/result-movie';

@Injectable({
    providedIn: 'root'
})
export class SearchMoviesService {

    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey

    protected queryBuilder: SearchQueryBuilderl = inject(SearchQueryBuilderl)
    protected querySubject$: Subject<string> = new Subject()
    searchResults$: Observable<any>

    http: HttpClient = inject(HttpClient)
    constructor() {
        this.searchResults$ = this.querySubject$.pipe(
            switchMap((query: string) => {
                return this.request(query)
            })
        )
    }

    search(query: string, page?: number): any {
        this.querySubject$.next(query)
    }

    private request(query: string): Observable<ResultMovie[]> {
        const endpoint = "search/movie"
        this.queryBuilder
            .apiKey(this.apikey)
            .searchQuery(query)
        const queryParams = this.queryBuilder.getQuery()
        const url = `${this.api}${endpoint}${queryParams}`

        return this.http.get<TmdbResultMovieResponse>(url).pipe(
            debounceTime(200),
            map(data => {
                return data.results.map(data => {
                    return new TmdbResultMovie(data)
                })
            })
        )
    }
}


class TmdbResultMovie implements ResultMovie {
    adult: boolean
    backdropImagePath: string
    genreIds: number[]
    hasVideo: boolean
    id: number
    mediaType: string
    originalLanguage: string
    originalTitle: string
    overview: string
    popularity: number
    posterImagePath: string
    releaseDate: string
    title: string
    voteAverage: number
    voteCount: number


    constructor(raw: TmdbResultMovieResponse["results"][0]) {
        this.adult = raw.adult 
        this.backdropImagePath = raw.backdrop_path
        this.genreIds = raw.genre_ids
        this.hasVideo = raw.video
        this.id = raw.id = raw.id
        this.mediaType = raw.media_type
        this.originalLanguage = raw.original_language
        this.originalTitle = raw.original_title
        this.overview = raw.overview
        this.popularity = raw.popularity
        this.posterImagePath = raw.poster_path
        this.releaseDate = raw.release_date
        this.title = raw.title 
        this.voteAverage = raw.vote_average
        this.voteCount = raw.vote_count
    }
}
