import { Component, inject, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageComponent } from '../image/image.component';
import MediaType from '../../models/types/media.type';
import ImageType from '../../models/types/image.type';
import CardDirection from '../../models/types/card-direction.type';
import { RoutingService } from '../../services/routing.service';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [RouterLink, ImageComponent],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {

    protected routingService = inject(RoutingService)
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




export interface CardParams {
    id?: number
    imageSrc?: string
    mediaType?: MediaType
    imageType: ImageType
    direction: CardDirection
}


