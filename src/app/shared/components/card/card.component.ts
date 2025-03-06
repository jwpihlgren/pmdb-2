import { Component, input, InputSignal } from '@angular/core';
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
    imageParams: ImageParams = {
        type: this.imageType,
        aspectRatio: this.aspectRatio,
        src: this.imageSrc
    }

    get imageSrc(): string {
        return this.params().imageSrc || ""
    }

    get mediaType(): "person" | "movie" | "show" | undefined {
        return this.params().mediaType
    }

    get imageType(): ImageType {
        return this.params().imageType
    }

    get id(): number | undefined {
        return this.params().id
    }

    get href(): string[] | undefined {
        return this.params().href
    }

    get aspectRatio(): AspectRatio {
        return this.params().aspectRatio
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


