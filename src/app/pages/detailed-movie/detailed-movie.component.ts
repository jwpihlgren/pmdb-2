import { Component, inject, numberAttribute, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DetailedMovie } from '../../shared/models/interfaces/detailed-movie';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { ImageComponent, ImageParams } from '../../shared/components/image/image.component';
import { ChipComponent } from '../../shared/components/chip-list/components/chip/chip.component';
import { environment } from '../../../environments/environment.development';
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

    movieDetails: Signal<DetailedMovie | undefined>

    constructor() {

        this.movieDetails = toSignal(this.activatedRoute.paramMap.pipe(switchMap(data => {
            return this.detailedMovieService.get(data.get("id")!)
        })))
    }

    get posterParams(): ImageParams {
        return { src: this.movieDetails()!.posterImagePath, type: "poster", aspectRatio: { numerator: 2, denominator: 3 } }
    }

    get imdbUrl(): string {
        const id = this.movieDetails()!.imdbId
        return `${environment.imdbUrl}${id}`
    }

    get voteCount(): string {
        return `${this.movieDetails()!.voteCount} votes`
    }

    get metaData(): Metadata[] {
        const metaData: Metadata[] = []
        const { releaseDate, runtime, spokenLanguages, productionCountries } = this.movieDetails()!
        metaData.push({ value: releaseDate, alt: "Release date" })
        metaData.push({ value: runtime, alt: "Runtime", suffix: " min" })
        metaData.push({ value: spokenLanguages.map(l => l.iso6391).join(", "), alt: "Spoken languages" })
        metaData.push({ value: productionCountries.map(l => l.iso31661).join(", "), alt: "Production countries" })
        return metaData
    }

    get topBilled() {
        const top = this.movieDetails()!.credits.cast.slice(0, 10)
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



