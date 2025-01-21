import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { TmdbConfig } from '../models/interfaces/tmdb/tmdb-config';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private configService = inject(ConfigService)
    config: TmdbConfig = this.configService.config

    imageUrl: string = this.config.images.secure_base_url
    posterSizes: string[] = Object.values(this.config.images.poster_sizes).map(size => {
        return size.replace("w", "")
    }).sort((a, b) => {
        if (isNaN(+a)) return 1
        if (isNaN(+b)) return -1
        return a < b ? 1 : b < a ? -1 : 0
    })

    getPosterUrl(image: string, size: number = 500): string {
        let closestSize: string | undefined = this.config.images.poster_sizes.find(posterSize => {
           return +posterSize > size 
        })
        if(!closestSize) closestSize = this.posterSizes[this.posterSizes.length]
        return `${this.imageUrl}/${closestSize}/${image}`
    }

}
