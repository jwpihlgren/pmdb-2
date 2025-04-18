import { Component, inject, Signal } from '@angular/core';
import { DetailedMovie } from '../../../../shared/models/interfaces/detailed-movie';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { ResultMovie } from '../../../../shared/models/interfaces/result-movie';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { ConfigService } from '../../../../shared/services/config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detailed-movie-recommendations',
  imports: [RouterLink, ImageComponent, ChipComponent],
  templateUrl: './detailed-movie-recommendations.component.html',
  styleUrl: './detailed-movie-recommendations.component.css'
})
export class DetailedMovieRecommendationsComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    protected configService: ConfigService = inject(ConfigService)
    movie: Signal<DetailedMovie>

    constructor(){
        this.movie = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => data["movie"] as DetailedMovie)), {requireSync: true})
    }

    createImageParams(movie: ResultMovie): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            src: movie.posterImagePath,
            type: "poster"
        }
    }

    getGenres(movie: ResultMovie): Genre[] {
         return this.configService.movieGenres.filter(genre => {
           return movie.genreIds.includes(genre.id)
        }) 
    }

    goBack(event: Event): void{
        event.preventDefault()
        this.location.back()
    }
}
