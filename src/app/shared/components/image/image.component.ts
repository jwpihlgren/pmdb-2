import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import ImageType from '../../models/types/image.type';
import AspectRatio from '../../models/types/aspect-ratio.type';

@Component({
    selector: 'app-image',
    imports: [NgOptimizedImage],
    templateUrl: './image.component.html',
    styleUrl: './image.component.css',
    standalone: true,
    host: {
        '[style.aspect-ratio]': 'aspectRatio.numerator+"/"+aspectRatio.denominator'
    }

})
export class ImageComponent {
    params = input.required<ImageParams>()

    get src(): string {
        return this.params().src
    }

    get type(): ImageType | undefined {
        return this.params().type
    }

    get aspectRatio(): AspectRatio {
        return this.params().aspectRatio
    }
}

export interface ImageParams {
    src: string,
    type?: "poster" | "backdrop" | "profile" | "still" | "logo"
    aspectRatio: AspectRatio
}
