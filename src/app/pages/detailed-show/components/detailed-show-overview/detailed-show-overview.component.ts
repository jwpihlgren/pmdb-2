import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailedShow, DetailedShowRecommendation } from '../../../../shared/models/interfaces/detailed-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { DecimalPipe } from '@angular/common';
import Metadata from '../../../../shared/models/interfaces/meta-data.interface';
import { environment } from '../../../../../environments/environment';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { RoutingService } from '../../../../shared/services/routing.service';
import { AppEventTriggerDirective } from '../../../../shared/directives/app-event-trigger.directive';

@Component({
    selector: 'app-detailed-show-overview',
    imports: [ImageComponent, ChipComponent, DecimalPipe, RouterLink, CardComponent],
    templateUrl: './detailed-show-overview.component.html',
    styleUrl: './detailed-show-overview.component.css',
    hostDirectives: [AppEventTriggerDirective]
})
export class DetailedShowOverviewComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected routingService: RoutingService = inject(RoutingService)
    detailedShow: Signal<DetailedShow>

    constructor() {
        this.detailedShow = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                return data["show"] as DetailedShow
            })
        ), { requireSync: true })
    }

    posterParams(detailedShow: DetailedShow): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            type: "poster",
            src: detailedShow.posterPath,
            priority: true
        }
    }

    metaData(detailedShow: DetailedShow): Metadata[] {
        const metaData: Metadata[] = []
        const { firstAirDate, episodeRunTime, spokenLanguages, productionCountries } = detailedShow
        metaData.push({ value: firstAirDate, alt: "Firs air date" })
        metaData.push({ value: episodeRunTime, alt: "Runtime", suffix: " min" })
        metaData.push({ value: spokenLanguages.map(l => l.iso6391).join(", "), alt: "Spoken languages" })
        metaData.push({ value: productionCountries.map(l => l.iso31661).join(", "), alt: "Production countries" })
        return metaData
    }

    imdbUrl(detailedShow: DetailedShow) {
        return `${environment.imdbMediaUrl}${detailedShow.imdbId}`
    }

    topBilled(detailedShow: DetailedShow) {
        const top = detailedShow.credits.cast.slice(0, 10)
        return top
    }

    createTopCardParams(top: DetailedShow["credits"]["cast"][0]): CardParams {
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

    createRecommendationCardParams(rec: DetailedShowRecommendation): CardParams {
        const params: CardParams = {
            imageType: "poster",
            direction: "horizontal",
            mediaType: "show",
            imageSrc: rec.posterPath,
            href: ["/", this.routingService.stubs.SHOW, `${rec.id}`],
            aspectRatio: { numerator: 2, denominator: 3 }
        }

        return params
    }

    createSeasonsCardParams(season: DetailedShow["seasons"][0]): CardParams {
        return {
            imageType: "poster",
            direction: "horizontal",
            mediaType: "show",
            imageSrc: season.posterImagePath,
            href: ["seasons", `${season.id}`],
            aspectRatio: {numerator: 2, denominator: 3}
        }
    }


} 
