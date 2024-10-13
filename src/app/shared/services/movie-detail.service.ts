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
    apiKey = environment.tmdbApiKey

    constructor(private http: HttpClient) { }

    get(id: string): Observable<DetailedMovie> {
        return this.request(id)
    }

    private request(id: string): Observable<DetailedMovie> {
        const endpoint = `movie/${id}` 
        const queryParams = `?api_key=${this.apiKey}`
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<TmdbMovieDetails>(url, options).pipe(
            map(data => new TmdbDetailedMovie(data))
        )
    }
}
