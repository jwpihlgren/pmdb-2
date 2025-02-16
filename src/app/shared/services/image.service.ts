import { inject, Injectable } from '@angular/core';
import { TmdbConfig } from '../models/interfaces/tmdb/tmdb-config';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})

export class ImageService {
    protected storage = inject(StorageService)
    config: TmdbConfig | null = this.storage.getSessionItem<TmdbConfig>(`${environment.storageKeyPrefix}-config`)

    imageUrl: string = this.config?.images.secure_base_url || ""

    parseSizes(sizes: string[]): string[] {
        return sizes.sort((a, b) => {
            a.replace("w", "")
            b.replace("w", "")
            if (isNaN(+a)) return 1
            if (isNaN(+b)) return -1
            return a < b ? 1 : b < a ? -1 : 0
        })
    }

    getUrl(image: string, size: number = 500, type: string | undefined): string {

        const types: any = {
            poster: "poster_sizes",
            backdrop: "backdrop_sizes",
            profile: "profile_sizes",
            logo: "logo_sizes",
            still: "still_sizes"
        }

        const queryType: "poster_sizes" | "backdrop_sizes" | "profile_sizes" | "logo_sizes" | "still_sizes" | undefined = 
            type ? types[type] : undefined

        let querySizes: any[] = []
        if (queryType) {
            querySizes = this.parseSizes(Object.values(this.config?.images[queryType] || []))
        }

        let closestSize: string | undefined = querySizes.find((querySize: string) => {
            return +querySize.replace("w", "") > size
        })
        if (!closestSize) closestSize = querySizes[querySizes.length - 1]

        return `${this.imageUrl}${closestSize}${image}`
    }

    getPlaceholderUrl(): string {
        return "https://images.unsplash.com/photo-1623018035782-b269248df916?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
}
