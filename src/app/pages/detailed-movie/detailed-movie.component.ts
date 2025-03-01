import { Component, inject, Signal } from '@angular/core';
import { MovieDetailService } from '../../shared/services/movie-detail.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DetailedMovie } from '../../shared/models/interfaces/detailed-movie';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-detailed-movie',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './detailed-movie.component.html',
    providers: [MovieDetailService],
    styleUrl: './detailed-movie.component.css'
})
export class DetailedMovieComponent {

    protected activatedRoute = inject(ActivatedRoute)
    protected movieDetailService = inject(MovieDetailService)

    movieDetails: Signal<DetailedMovie | undefined>

    constructor() {
        const id = this.activatedRoute.snapshot.paramMap.get("id")!
        this.movieDetails = toSignal(this.movieDetailService.get(id))
    }

}
