import { Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DetailedMovie } from '../../shared/models/interfaces/detailed-movie';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { ImageComponent, ImageParams } from '../../shared/components/image/image.component';
import { ChipComponent } from '../../shared/components/chip-list/components/chip/chip.component';
import { DetailedMovieService } from '../../shared/services/detailed-movie.service';
import { CardComponent, CardParams } from '../../shared/components/card/card.component';
import { ResultMovie } from '../../shared/models/interfaces/result-movie';
import { RoutingService } from '../../shared/services/routing.service';
import { switchMap } from 'rxjs';
import Metadata from '../../shared/models/interfaces/meta-data.interface';

@Component({
    selector: 'app-detailed-movie',
    standalone: true,
    imports: [ImageComponent, NgOptimizedImage, ChipComponent, DecimalPipe, CardComponent],
    templateUrl: './detailed-movie.component.html',
    providers: [DetailedMovieService],
    styleUrl: './detailed-movie.component.css'
})
export class DetailedMovieComponent {

    protected routingService = inject(RoutingService)
    protected activatedRoute = inject(ActivatedRoute)
    protected detailedMovieService = inject(DetailedMovieService)

    movieDetails: Signal<DetailedMovie | undefined> = signal(undefined)

    constructor() {
        this.movieDetails = toSignal(this.activatedRoute.paramMap.pipe(switchMap(data => {
            return this.detailedMovieService.get(data.get("id")!)
        })))
    }

    posterParams(detailedMovie: DetailedMovie): ImageParams {
        return { src: detailedMovie.posterImagePath, type: "poster", aspectRatio: { numerator: 2, denominator: 3 } }
    }

    metaData(detailedMovie: DetailedMovie): Metadata[] {
        const metaData: Metadata[] = []
        const { releaseDate, runtime, spokenLanguages, productionCountries } = detailedMovie
        metaData.push({ value: releaseDate, alt: "Release date" })
        metaData.push({ value: runtime, alt: "Runtime", suffix: " min" })
        metaData.push({ value: spokenLanguages.map(l => l.iso6391).join(", "), alt: "Spoken languages" })
        metaData.push({ value: productionCountries.map(l => l.iso31661).join(", "), alt: "Production countries" })
        return metaData
    }

    imdbUrl(detailedMovie: DetailedMovie){
        return `https://www.imdb.com/title/${detailedMovie.imdbId}`
    }

    topBilled(detailedMovie: DetailedMovie) {
        const top = detailedMovie.credits.cast.slice(0, 10)
        return top
    }

    createTopCardParams(top: DetailedMovie["credits"]["cast"][0]): CardParams {
        const params: CardParams = {
            imageType: "profile",
            direction: "vertical",
            id: top.id,
            mediaType: "person",
            imageSrc: top.profilePath,
            href: ["/", this.routingService.stubs.PERSON, `${top.id}`],
            aspectRatio: { numerator: 2, denominator: 3 }
        }
        return params
    }

    createRecommendationCardParams(rec: ResultMovie): CardParams {
        const params: CardParams = {
            imageType: "poster",
            direction: "horizontal",
            id: rec.id,
            mediaType: "movie",
            imageSrc: rec.backdropImagePath,
            href: ["/", this.routingService.stubs.MOVIE, `${rec.id}`],
            aspectRatio: { numerator: 16, denominator: 9 }
        }

        return params
    }

}



