import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { DetailedMovie } from '../models/interfaces/detailed-movie';
import { TmdbMovieDetails } from '../models/interfaces/tmdb/tmdb-movie-details';
import { TmdbDetailedMovie } from '../models/classes/tmdb-detailed-movie';

@Injectable({
    providedIn: 'root'
})
export class MovieDetailService {

    api = environment.tmdbApiUrl
    apikey = environment.tmdbApiKey

    constructor(private http: HttpClient) { }

    get(id: string): Observable<DetailedMovie> {
        const endpoint = "movie/"
        const queryParams = `?api_key=${this.apikey}`
        const url = `${this.api}${endpoint}${id}${queryParams}`
        const options = {}

        return this.http.get<TmdbMovieDetails>(url, options).pipe(
            map(data => {
                return new TmdbDetailedMovie(data)
            })
        )
    }
}
