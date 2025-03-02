import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TmdbDetailedShow } from '../models/classes/tmdb-detailed-show';
import { TmdbDetailedShowResponse } from '../models/interfaces/tmdb/tmdb-detailed-show-response';

@Injectable({
    providedIn: 'root'
})
export class DetailedShowService {

    api = environment.tmdbApiUrl
    apiKey = environment.tmdbApiKey

    constructor(private http: HttpClient) { }

    get(id: string): Observable<TmdbDetailedShow> {
        return this.request(id)
    }

    private request(id: string): Observable<TmdbDetailedShow> {
        const endpoint = `tv/${id}`
        const queryParams = `?api_key=${this.apiKey}` 
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<TmdbDetailedShowResponse>(url, options).pipe(
            map(data => new TmdbDetailedShow(data))
        )
    }
}
