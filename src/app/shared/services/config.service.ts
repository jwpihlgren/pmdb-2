import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TmdbConfig } from '../models/interfaces/tmdb/tmdb-config';
import { environment } from '../../../environments/environment';
import { map, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    protected http = inject(HttpClient)
    protected storage = inject(StorageService)
    initialize(): Observable<boolean> {
        const storageKey = `${environment.storageKeyPrefix}-config`
        const config: TmdbConfig | null = this.storage.getSessionItem(storageKey)
        console.log(config)
        if(config) {
            return of(true)
        }
        const url = `${environment.tmdbApiUrl}configuration?api_key=${environment.tmdbApiKey}`
        return this.http.get<TmdbConfig>(url).pipe(
            map(data => {
                this.storage.setSessionItem<TmdbConfig>(storageKey, data)
                return true
            })
        )
    }
}
