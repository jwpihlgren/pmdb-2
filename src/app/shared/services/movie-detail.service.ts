import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { DetailedMovie } from '../models/interfaces/detailed-movie';
import { TmdbMovieDetails } from '../models/interfaces/tmdb/tmdb-movie-details';
import { TmdbDetailedMovie } from '../models/classes/tmdb-detailed-movie';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';

@Injectable({
    providedIn: 'root'
})
export class MovieDetailService {

    api = environment.tmdbApiUrl

    protected queryBuilder = inject(SearchQueryBuilder)
    protected http = inject(HttpClient)


    get(id: string): Observable<DetailedMovie> {
        return this.request(id)
    }

    private request(id: string): Observable<DetailedMovie> {
        const endpoint = `movie/${id}` 
        this.queryBuilder.apiKey(environment.tmdbApiKey)
        const queryParams = this.queryBuilder.getQuery()
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<TmdbMovieDetails>(url, options).pipe(
            map(data => new TmdbDetailedMovie(data))
        )
    }
}
