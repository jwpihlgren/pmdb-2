import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-image',
    imports: [NgOptimizedImage],
    templateUrl: './image.component.html',
    styleUrl: './image.component.css',
    standalone: true
})
export class ImageComponent {
    params = input.required<ImageParams>()
}

export interface ImageParams {
    src: string,
    type?: "poster" | "backdrop" | "profile" | "still" | "logo"
}
