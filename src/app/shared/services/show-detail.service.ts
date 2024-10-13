import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TmdbDetailedShow } from '../models/classes/tmdb-detailed-show';
import { TmdbShowDetails } from '../models/interfaces/tmdb/tmdb-show-details';
import { DetailedShow } from '../models/interfaces/detailed-show';

@Injectable({
    providedIn: 'root'
})
export class ShowDetailService {

    api = environment.tmdbApiUrl
    apiKey = environment.tmdbApiKey

    constructor(private http: HttpClient) { }

    get(id: string): Observable<DetailedShow> {
        return this.request(id)
    }

    private request(id: string): Observable<DetailedShow> {
        const endpoint = `tv/${id}`
        const queryParams = `?api_key=${this.apiKey}` 
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<TmdbShowDetails>(url, options).pipe(
            map(data => new TmdbDetailedShow(data))
        )
    }
}
