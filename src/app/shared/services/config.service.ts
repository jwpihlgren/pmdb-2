import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TmdbConfig } from '../models/interfaces/tmdb/tmdb-config';
import { environment } from '../../../environments/environment';
import { forkJoin, map, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { Genre } from '../models/interfaces/genre';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private configStorageKey = `${environment.storageKeyPrefix}-config`
    private movieGenresStorageKey = `${environment.storageKeyPrefix}-movie-genres`
    private tvGenresStorageKey = `${environment.storageKeyPrefix}-tv-genres`

    config!: TmdbConfig
    movieGenres!: Genre[]
    tvGenres!: Genre[]

    protected http = inject(HttpClient)
    protected storage = inject(StorageService)
    initialize(): Observable<boolean> {
        const config: TmdbConfig | null = this.storage.getSessionItem(this.configStorageKey)
        const movieGenres: Genre[] | null = this.storage.getSessionItem(this.movieGenresStorageKey)
        const tvGenres: Genre[] | null = this.storage.getSessionItem(this.tvGenresStorageKey)
        if ([config, movieGenres, tvGenres].every(item => item !== null)) {
            this.config = config as TmdbConfig
            this.movieGenres = movieGenres as Genre[]
            this.tvGenres = tvGenres as Genre[]
            return of(true)
        }
        const configUrl = `${environment.tmdbApiUrl}configuration?api_key=${environment.tmdbApiKey}`
        const movieGenresUrl = `${environment.tmdbApiUrl}genre/movie/list?api_key=${environment.tmdbApiKey}`
        const tvGenresUrl = `${environment.tmdbApiUrl}genre/tv/list?api_key=${environment.tmdbApiKey}`

        return forkJoin({
            config: this.http.get<TmdbConfig>(configUrl),
            movieGenres: this.http.get<{ genres: Genre[] }>(movieGenresUrl),
            tvGenres: this.http.get<{ genres: Genre[] }>(tvGenresUrl)
        }).pipe(
            map(data => {
                this.storage.setSessionItem<TmdbConfig>(this.configStorageKey, data.config)
                this.storage.setSessionItem<Genre[]>(this.movieGenresStorageKey, data.movieGenres.genres)
                this.storage.setSessionItem<Genre[]>(this.tvGenresStorageKey, data.tvGenres.genres)
                this.config = data.config
                this.movieGenres = data.movieGenres.genres
                this.tvGenres = data.tvGenres.genres
                return true
            })
        )
    }
}
