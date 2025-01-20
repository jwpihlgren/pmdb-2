import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TmdbConfig } from '../models/interfaces/tmdb/tmdb-config';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private http: HttpClient) { }

    config!: TmdbConfig
    destroy$: BehaviorSubject<boolean> = new BehaviorSubject(false)
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
