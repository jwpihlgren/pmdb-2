import { Component, inject, input, InputSignal, Signal } from '@angular/core';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { DetailedMovie } from '../../../../shared/models/interfaces/detailed-movie';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import Metadata from '../../../../shared/models/interfaces/meta-data.interface';
import { DecimalPipe } from '@angular/common';
import { RoutingService } from '../../../../shared/services/routing.service';
import { ResultMovie } from '../../../../shared/models/interfaces/result-movie';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
    selector: 'app-detailed-movie-overview',
    imports: [ImageComponent, ChipComponent, CardComponent, RouterLink, DecimalPipe],
    templateUrl: './detailed-movie-overview.component.html',
    styleUrl: './detailed-movie-overview.component.css'
})
export class DetailedMovieOverviewComponent {
    protected routingService = inject(RoutingService)
    protected activatedRoute = inject(ActivatedRoute)
    detailedMovie: Signal<DetailedMovie>

    constructor(){
        this.detailedMovie = toSignal(this.activatedRoute.parent!.data.pipe(map(data => {
            console.log(this.activatedRoute.parent)
            console.log(data)
            return data as DetailedMovie})), {requireSync: true})
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

    imdbUrl(detailedMovie: DetailedMovie) {
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
            imageSrc: rec.posterImagePath,
            href: ["/", this.routingService.stubs.MOVIE, `${rec.id}`],
            aspectRatio: { numerator: 2, denominator: 3 }
        }

        return params
    }



}
