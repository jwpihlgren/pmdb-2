import { inject, Injectable } from '@angular/core';
import { IsoCountry, IsoCountryMap } from './config.service';
import { environment } from '../../../environments/environment.development';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class IsoCountryService {

    private dailyKeywordKeywordKey = `${environment.storageKeyPrefix}-isoCountries`
    private isoCountriesMap: IsoCountryMap = {}
    private isoCountries: IsoCountry[] = []
    protected storage = inject(StorageService)


    constructor() {
        this.loadIsoCountries()
    }

    private loadIsoCountries(): void {
        const cached = this.storage.getLocalItem<IsoCountryMap>(this.dailyKeywordKeywordKey)
        if (cached) {
            this.isoCountriesMap = cached
            for (const [key, value] of Object.entries(cached)) {
                this.isoCountries.push({
                    cca2: key,
                    ...value
                })
            }
        }
    }

    commonNameByIsoCode(code: string) {
        return this.isoCountriesMap[code].name.common ?? undefined
    }

    search(query: string, limit: number = 50, filter: string[]): IsoCountry[] {
        if (!this.isLoaded()) throw new Error(`IsoCountries are not loaded as expectd`)
        if (!query.trim()) return []

        const lower = query.toLowerCase()
        const filteredIsoCountries = this.isoCountries.filter(c => !filter.includes(c.cca2))

        const exact = filteredIsoCountries.filter(k => k.name.common.toLowerCase() === lower)

        const startsWith = filteredIsoCountries.filter(k =>
            k.name.common.toLowerCase().startsWith(lower) &&
            k.name.common.toLowerCase() !== lower
        )

        const contains = filteredIsoCountries.filter(k =>
            k.name.common.toLowerCase().includes(lower) &&
            !k.name.common.toLowerCase().startsWith(lower)
        )

        const result = [...exact, ...startsWith, ...contains].slice(0, limit)
        return result
    }


    isLoaded(): boolean {
        return this.isoCountries.length > 0
    }

}
