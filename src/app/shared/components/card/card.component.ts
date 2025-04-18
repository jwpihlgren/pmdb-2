import { Component, input, InputSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageComponent, ImageParams } from '../image/image.component';
import MediaType from '../../models/types/media.type';
import ImageType from '../../models/types/image.type';
import CardDirection from '../../models/types/card-direction.type';
import AspectRatio from '../../models/types/aspect-ratio.type';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [RouterLink, ImageComponent],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {

    readonly params: InputSignal<CardParams> = input.required()
    maxCharacters = 140
    imageParams!: ImageParams

    createImageParams(): ImageParams {
        return {
            type: this.params().imageType,
            aspectRatio: this.params().aspectRatio,
            src: this.params().imageSrc || ""
        }
    }
}

export interface CardParams {
    id?: number
    imageSrc?: string
    mediaType?: MediaType
    imageType: ImageType
    direction: CardDirection
    href?: string[]
    aspectRatio: AspectRatio
}


