import { Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DetailedMovie } from '../../shared/models/interfaces/detailed-movie';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { DetailedMovieService } from '../../shared/services/detailed-movie.service';
import { switchMap } from 'rxjs';
import { ImageService } from '../../shared/services/image.service';

@Component({
    selector: 'app-detailed-movie',
    standalone: true,
    imports: [NgOptimizedImage, NgIf, RouterOutlet],
    templateUrl: './detailed-movie.component.html',
    providers: [DetailedMovieService],
    styleUrl: './detailed-movie.component.css'
})
export class DetailedMovieComponent {

    protected activatedRoute = inject(ActivatedRoute)
    protected detailedMovieService = inject(DetailedMovieService)
    protected imageService = inject(ImageService)

    movieDetails: Signal<DetailedMovie | undefined> = signal(undefined)

    constructor() {
        this.movieDetails = toSignal(this.activatedRoute.paramMap.pipe(switchMap(data => {
            return this.detailedMovieService.get(data.get("id")!)
        })))
    }

    sanitizeUrl(url: string): string {
        return this.imageService.sanitizeImageUrl(url)
    }


}



