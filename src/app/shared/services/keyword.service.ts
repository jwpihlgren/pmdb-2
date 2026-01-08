import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import Keyword from '../models/interfaces/keywords';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class KeywordService {

    private dailyKeywordKeywordKey = `${environment.storageKeyPrefix}-keywords`
    private keywords: Keyword[] = []
    protected storage = inject(StorageService)


    constructor() {
        this.loadKeywords()
    }

    private loadKeywords(): void {
        const cached = this.storage.getSessionItem<Keyword[]>(this.dailyKeywordKeywordKey)
        if (cached) {
            this.keywords = cached
        }
    }

    keywordNameById(id: string): string | undefined {
        return this.keywords.find(k => k.id.toString() === id)?.name
    }

    search(query: string, limit: number = 50, filter: string[]): Keyword[] {
        if (!this.keywords.length || !query.trim()) return []
        const lower = query.toLowerCase()
        const filteredKeywords = this.keywords.filter(k => !filter.includes(k.id))

        const exact = filteredKeywords.filter(k => k.name.toLowerCase() === lower)

        const startsWith = filteredKeywords.filter(k =>
            k.name.toLowerCase().startsWith(lower) &&
            k.name.toLowerCase() !== lower
        )

        const contains = filteredKeywords.filter(k =>
            k.name.toLowerCase().includes(lower) &&
            !k.name.toLowerCase().startsWith(lower)
        )

        const result = [...exact, ...startsWith, ...contains].slice(0, limit)
        return result
    }


    isLoaded(): boolean {
        return this.keywords.length > 0
    }


}
