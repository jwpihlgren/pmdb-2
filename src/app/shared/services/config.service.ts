import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TmdbConfig } from '../models/interfaces/tmdb/tmdb-config';
import { environment } from '../../../environments/environment';
import { forkJoin, map, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { Genre } from '../models/interfaces/genre';
import Keyword from '../models/interfaces/keywords';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private configStorageKey = `${environment.storageKeyPrefix}-config`
    private movieGenresStorageKey = `${environment.storageKeyPrefix}-movie-genres`
    private tvGenresStorageKey = `${environment.storageKeyPrefix}-tv-genres`
    private dailyKeywordKey = `${environment.storageKeyPrefix}-keywords`
    private isoCountriesKey = `${environment.storageKeyPrefix}-isoCountries`

    config!: TmdbConfig
    movieGenres!: Genre[]
    showGenres!: Genre[]
    isoCountriesMap!: IsoCountryMap

    protected http = inject(HttpClient)
    protected storage = inject(StorageService)

    initialize(): Observable<boolean> {
        const config: TmdbConfig | null = this.storage.getSessionItem(this.configStorageKey)
        const movieGenres: Genre[] | null = this.storage.getSessionItem(this.movieGenresStorageKey)
        const tvGenres: Genre[] | null = this.storage.getSessionItem(this.tvGenresStorageKey)
        if ([config, movieGenres, tvGenres].every(item => item !== null)) {
            this.config = config as TmdbConfig
            this.movieGenres = movieGenres as Genre[]
            this.showGenres = tvGenres as Genre[]
            return of(true)
        }
        const configUrl = `${environment.tmdbApiUrl}configuration?api_key=${environment.tmdbApiKey}`
        const movieGenresUrl = `${environment.tmdbApiUrl}genre/movie/list?api_key=${environment.tmdbApiKey}`
        const tvGenresUrl = `${environment.tmdbApiUrl}genre/tv/list?api_key=${environment.tmdbApiKey}`
        const dailyKeywordsIdExportUrl = `${environment.tmdbProxyUrl}`
        const isoCountriesUrl = `${environment.isoCountriesApiUrl}`

        return forkJoin({
            config: this.http.get<TmdbConfig>(configUrl),
            movieGenres: this.http.get<{ genres: Genre[] }>(movieGenresUrl),
            isoCountries: this.http.get<IsoCountry[]>(isoCountriesUrl).pipe(
                map(data => data.reduce((acc, cur) => {
                    const key = cur.cca2
                    const name = { name: cur.name }
                    acc[key] = name
                    return acc
                }, {} as IsoCountryMap))
            ),
            showGenres: this.http.get<{ genres: Genre[] }>(tvGenresUrl),
            dailyKeywordIds: this.http.get(dailyKeywordsIdExportUrl, { responseType: "text" })
                .pipe(
                    map(data => {
                        return data.split("\n").filter(line => line.trim()).map(line => JSON.parse(line) as Keyword)
                    })
                )
        }).pipe(
            map(data => {
                this.storage.setSessionItem<TmdbConfig>(this.configStorageKey, data.config)
                this.storage.setSessionItem<Genre[]>(this.movieGenresStorageKey, data.movieGenres.genres)
                this.storage.setSessionItem<Genre[]>(this.tvGenresStorageKey, data.showGenres.genres)
                this.storage.setSessionItem<any>(this.dailyKeywordKey, data.dailyKeywordIds)
                this.storage.setLocalItem<IsoCountryMap>(this.isoCountriesKey, data.isoCountries)
                this.config = data.config
                this.movieGenres = data.movieGenres.genres
                this.showGenres = data.showGenres.genres
                return true
            })
        )
    }
}

export type IsoCountryMap = Record<string, Pick<IsoCountry, "name">>

export interface IsoCountry {
    cca2: string
    name: IsoCountryName & {
        nativeName: Record<string, IsoCountryName>
    }
}

export interface IsoCountryName {
    common: string
    official: string
}
