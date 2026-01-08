import { Component, computed, inject, Signal } from '@angular/core';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { DetailedMovie } from '../../../../shared/models/interfaces/detailed-movie';
import { ActivatedRoute, Router, RouterLink, UrlTree } from '@angular/router';
import Metadata from '../../../../shared/models/interfaces/meta-data.interface';
import { DecimalPipe } from '@angular/common';
import { RoutingService } from '../../../../shared/services/routing.service';
import { ResultMovie } from '../../../../shared/models/interfaces/result-movie';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { AppEventTriggerDirective } from '../../../../shared/directives/app-event-trigger.directive';
import OverflowRowOptions, { OverflowRowComponent } from '../../../../shared/components/overflow-row/overflow-row.component';
import { ContentHeroComponent } from '../../../../shared/components/content-hero/content-hero.component';
import { ContentWithSidebarComponent } from '../../../../shared/components/content-with-sidebar/content-with-sidebar.component';
import { DiscoverMoviesService } from '../../../../shared/services/discover/movie/discover-movies.service';
import Keyword from '../../../../shared/models/interfaces/keywords';

@Component({
    selector: 'app-detailed-movie-overview',
    imports: [ImageComponent, ChipComponent, CardComponent, DecimalPipe, OverflowRowComponent, ContentHeroComponent, ContentWithSidebarComponent, RouterLink],
    templateUrl: './detailed-movie-overview.component.html',
    styleUrl: './detailed-movie-overview.component.css',
    hostDirectives: [{
        directive: AppEventTriggerDirective,
    }]
})
export class DetailedMovieOverviewComponent {
    protected routingService = inject(RoutingService)
    protected activatedRoute = inject(ActivatedRoute)
    protected router = inject(Router)
    protected discoverService = inject(DiscoverMoviesService)
    detailedMovie: Signal<DetailedMovie>

    constructor() {
        this.detailedMovie = toSignal(this.activatedRoute.parent!.data.pipe(map(data => {
            return data["movie"] as DetailedMovie
        })), { requireSync: true })
    }

    castOptions = computed<OverflowRowOptions>(() => ({
        title: "Top billed cast",
        showMoreLink: ["cast-and-crew"],
        fallbackText: "No top bille cast",
        fallback: this.detailedMovie().credits.cast.length === 0
    }))
    recommendedOptions = computed<OverflowRowOptions>(() => ({
        title: "Recommendations",
        showMoreLink: ["recommendations"],
        fallbackText: "No recommendations",
        fallback: this.detailedMovie().recommendations.results.length === 0
    }))



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
        return `${environment.imdbMediaUrl}${detailedMovie.imdbId}`
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

    discoverGenres(genres: { id: number, name: string }[]): UrlTree {
        const builder = this.discoverService.discoverMovieQueryBuilder()
        builder.with("withGenres", { values: genres.map(k => k.id.toString()), operator: "and" })
        return builder.buildUrlTree(this.router)
    }




}
