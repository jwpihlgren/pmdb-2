import { Component, input, InputSignal } from '@angular/core';
import { ResultMovie } from '../../../../models/interfaces/result-movie';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-content-movie',
    imports: [DecimalPipe],
    templateUrl: './content-movie.component.html',
    styleUrl: './content-movie.component.css',
    standalone: true
})
export class ContentMovieComponent {
    params: InputSignal<ResultMovie> = input.required<ResultMovie>()
}

