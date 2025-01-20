import { Component, Signal } from '@angular/core';
import { MovieDetailService } from '../../shared/services/movie-detail.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DetailedMovie } from '../../shared/models/interfaces/detailed-movie';

@Component({
    selector: 'app-detailed-movie',
    standalone: true,
    imports: [],
    templateUrl: './detailed-movie.component.html',
    providers: [MovieDetailService],
    styleUrl: './detailed-movie.component.css'
})
export class DetailedMovieComponent {

    movieDetails: Signal<DetailedMovie | undefined>

    constructor(private detailedMovie: MovieDetailService, activatedRoute: ActivatedRoute) {
        const id = activatedRoute.snapshot.paramMap.get("id")!
        this.movieDetails = toSignal(this.detailedMovie.get(id))
    }

}
