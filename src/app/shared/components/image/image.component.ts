import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import AspectRatio from '../../models/types/aspect-ratio.type';
import { ImageService } from '../../services/image.service';

@Component({
    selector: 'app-image',
    imports: [NgOptimizedImage],
    templateUrl: './image.component.html',
    styleUrl: './image.component.css',
    standalone: true,
    host: {
        '[style.aspect-ratio]': 'params().aspectRatio.numerator+"/"+params().aspectRatio.denominator',
        '[class.rounded-corners]': 'rounded()'
    }

})
export class ImageComponent {
    params = input.required<ImageParams>()
    rounded = input(true)
    protected imageService: ImageService = inject(ImageService)

    sanitizeUrl(url: string): string {
        return this.imageService.sanitizeImageUrl(url)
    }
}

export interface ImageParams {
    src: string,
    type?: "poster" | "backdrop" | "profile" | "still" | "logo"
    aspectRatio: AspectRatio,
    priority?: boolean
}
