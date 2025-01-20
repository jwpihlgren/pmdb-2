import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { TmdbConfig } from '../models/interfaces/tmdb/tmdb-config';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private http: HttpClient) { }

    config!: TmdbConfig
    initialize(): Observable<boolean> {
        const url = `${environment.tmdbApiUrl}configuration?api_key=${environment.tmdbApiKey}`
        return this.http.get<TmdbConfig>(url).pipe(
            map(data => {
                this.config = data
                return true
            })
        )
    }
}
