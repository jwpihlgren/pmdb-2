import { Component, inject, input, InputSignal } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
    selector: 'app-card-movie',
    standalone: true,
    imports: [],
    templateUrl: './card-movie.component.html',
    styleUrl: './card-movie.component.css'
})
export class CardMovieComponent {

    readonly params: InputSignal<CardMovieParams> = input.required()

    constructor() {}

}


interface CardMovieParams {
    src: string
    title: string
    overview: string
}
