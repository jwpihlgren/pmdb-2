import { Component, input, InputSignal } from '@angular/core';
import { TrendingMovie } from '../../models/interfaces/trending-movie';
import { RouterLink } from '@angular/router';
import { ImageComponent } from '../image/image.component';

@Component({
    selector: 'app-card-movie',
    standalone: true,
    imports: [RouterLink, ImageComponent],
    templateUrl: './card-movie.component.html',
    styleUrl: './card-movie.component.css',
})
export class CardMovieComponent {

    readonly params: InputSignal<CardMovieParams> = input.required()
    maxCharacters = 140
}

export type CardMovieParams = Pick<TrendingMovie, "title" | "id" | "releaseDate" | "overview" | "posterImagePath" | "popularity" | "orignalLanguage">

