import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageComponent } from '../image/image.component';

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
}


type MediaType = "person" | "movie" | "show"
type ImageType =  "poster" | "backdrop" | "profile" | "logo"
type CardDirection = "vertical" | "horizontal"


export interface CardParams {
    id?: number
    imageSrc?: string
    mediaType?: MediaType
    imageType: ImageType
    direction: CardDirection
}


