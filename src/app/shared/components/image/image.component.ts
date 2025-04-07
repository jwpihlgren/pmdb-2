import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import AspectRatio from '../../models/types/aspect-ratio.type';

@Component({
    selector: 'app-image',
    imports: [NgOptimizedImage],
    templateUrl: './image.component.html',
    styleUrl: './image.component.css',
    standalone: true,
    host: {
        '[style.aspect-ratio]': 'params().aspectRatio.numerator+"/"+params().aspectRatio.denominator'
    }

})
export class ImageComponent {
    params = input.required<ImageParams>()
}

export interface ImageParams {
    src: string,
    type?: "poster" | "backdrop" | "profile" | "still" | "logo"
    aspectRatio: AspectRatio
}
