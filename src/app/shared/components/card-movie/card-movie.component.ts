import { Component, input, InputSignal } from '@angular/core';
import { TrendingMovie } from '../../models/interfaces/trending-movie';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-card-movie',
    standalone: true,
    imports: [RouterLink, NgOptimizedImage],
    templateUrl: './card-movie.component.html',
    styleUrl: './card-movie.component.css',
})
export class CardMovieComponent {

    readonly params: InputSignal<CardMovieParams> = input.required()
}

export type CardMovieParams = Pick<TrendingMovie, "title" | "id" | "releaseDate" | "overview" | "posterImagePath" | "popularity" | "orignalLanguage">

