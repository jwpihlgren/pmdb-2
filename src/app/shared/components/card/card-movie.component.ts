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
export class CardMovieComponent {

    readonly params: InputSignal<CardParams> = input.required()
    maxCharacters = 140
}

export interface CardParams {
    id: number
    src: string
}
