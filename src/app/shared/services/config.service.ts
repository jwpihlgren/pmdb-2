import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { TmdbConfig } from '../models/interfaces/tmdb/tmdb-config';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    protected http = inject(HttpClient)
    protected storage = inject(StorageService)
    initialize(): Observable<boolean> {
        const url = `${environment.tmdbApiUrl}configuration?api_key=${environment.tmdbApiKey}`
        return this.http.get<TmdbConfig>(url).pipe(
            map(data => {
                this.storage.setLocalItem(`${environment.storageKeyPrefix}-config`, data)
                return true
            })
        )
    }
}
