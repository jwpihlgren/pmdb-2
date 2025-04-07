import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { DetailedMovie } from '../models/interfaces/detailed-movie';
import { TmdbDetailedMovie } from '../models/classes/tmdb-detailed-movie';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';
import { TmdbDetailedMovieResponse } from '../models/interfaces/tmdb/tmdb-detailed-movie-response';

@Injectable({
    providedIn: 'root'
})
export class DetailedMovieService {

    api = environment.tmdbApiUrl

    protected queryBuilder = inject(SearchQueryBuilder)
    protected http = inject(HttpClient)


    get(id: string): Observable<DetailedMovie> {
        return this.request(id)
    }

    private request(id: string): Observable<DetailedMovie> {
        const endpoint = `movie/${id}`
        this.queryBuilder.apiKey(environment.tmdbApiKey)
        this.queryBuilder.appendToResponse(["credits", "images", "keywords", "recommendations", "reviews", "similar", "videos"])
        const queryParams = this.queryBuilder.getQuery()
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<TmdbDetailedMovieResponse>(url, options).pipe(
            map(data => new TmdbDetailedMovie(data)),
            tap(data => console.log(data))
        )
    }
}
