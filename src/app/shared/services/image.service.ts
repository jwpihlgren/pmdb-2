import { inject, Injectable } from '@angular/core';
import { TmdbConfig } from '../models/interfaces/tmdb/tmdb-config';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment.development';
import AspectRatio from '../models/types/aspect-ratio.type';
import { ColorComponent } from '../components/color/color.component';

type ImageType = "poster_sizes" | "backdrop_sizes" | "profile_sizes" | "logo_sizes" | "still_sizes"

@Injectable({
    providedIn: 'root'
})


export class ImageService {
    protected storage = inject(StorageService)
    config: TmdbConfig | null = this.storage.getSessionItem<TmdbConfig>(`${environment.storageKeyPrefix}-config`)

    imageUrl: string = this.config?.images.secure_base_url || ""

    private PLACEHOLDER_IMAGE_CONSTANT = "_LoAdiNg_"

    parseSizes(sizes: string[]): string[] {
        return sizes.sort((a, b) => {
            a.replace("w", "")
            b.replace("w", "")
            if (isNaN(+a)) return 1
            if (isNaN(+b)) return -1
            return a < b ? 1 : b < a ? -1 : 0
        })
    }

    sanitizeImageUrl(url: string): string {
        if (url === "") return this.PLACEHOLDER_IMAGE_CONSTANT
        return url
    }

    getUrl(image: string, size: number = 500, type?: string): string {

        if (image === "") return this.getPlaceholderUrl()
        if (image === this.PLACEHOLDER_IMAGE_CONSTANT) return this.getPlaceholderUrl({ width: size })
        const types: any = {
            poster: "poster_sizes",
            backdrop: "backdrop_sizes",
            profile: "profile_sizes",
            logo: "logo_sizes",
            still: "still_sizes"
        }

        const queryType: ImageType = type && types[type] || "poster_sizes"

        let querySizes: any[] = this.parseSizes(Object.values(this.config?.images[queryType] || []))

        let closestSize = querySizes.find((querySize: string) => +querySize.replace("w", "") > size)
        if (!closestSize) closestSize = querySizes[querySizes.length - 1]

        return `${this.imageUrl}${closestSize}${image}`
    }

    getPlaceholderUrl(options?: Partial<PlaceholderOptions>): string {

        const background = "101a21"
        const foreground = "d26b42"
        const width = options?.width || 400
        const height = this.getHeightFromAspectRatio(width, options?.aspectRatio || { numerator: 2, denominator: 3 })
        const fileFormat = options?.fileFormat || "png"
        const text = encodeURIComponent((options?.text || "no image"))

        return `${environment.dummyImageApiUrl}/${width}x${height}/${background}/${foreground}.${fileFormat}&text=${text}`

    }

    getHeightFromAspectRatio(width: number, aspectRatio: AspectRatio): number {
        return width * aspectRatio.denominator / aspectRatio.numerator
    }

    getWidthFromAspectRatio(height: number, aspectRatio: AspectRatio): number {
        return height * (aspectRatio.denominator / aspectRatio.denominator)
    }

}

interface PlaceholderOptions {
    width: number
    aspectRatio: AspectRatio
    fileFormat: "png" | "jpg" | "gif"
    text: string
}
