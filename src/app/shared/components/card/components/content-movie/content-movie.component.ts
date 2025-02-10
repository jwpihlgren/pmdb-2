import { Component, input, InputSignal } from '@angular/core';

@Component({
    selector: 'app-content-movie',
    imports: [],
    templateUrl: './content-movie.component.html',
    styleUrl: './content-movie.component.css',
    standalone: true
})
export class ContentMovieComponent {
    params: InputSignal<ContentMovieParams> = input.required<ContentMovieParams>()
}

export interface ContentMovieParams {
    title: string
    id: number
    releaseDate: string
    overview: string
    posterImagePath: string
    popularity: number
    originalLanguage: string
}
