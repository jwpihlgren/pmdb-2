import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailedShow } from '../../../../shared/models/interfaces/detailed-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AppEventTriggerDirective } from '../../../../shared/directives/app-event-trigger.directive';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { ConfigService } from '../../../../shared/services/config.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-detailed-show-recommendations',
    imports: [RouterLink, ImageComponent, ChipComponent],
    templateUrl: './detailed-show-recommendations.component.html',
    styleUrl: './detailed-show-recommendations.component.css',
    hostDirectives: [AppEventTriggerDirective]
})
export class DetailedShowRecommendationsComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected configService: ConfigService = inject(ConfigService)
    protected location: Location = inject(Location)
    detailedShow: Signal<DetailedShow>

    constructor() {
        this.detailedShow = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                return data["show"] as DetailedShow
            })
        ), { requireSync: true })
    }
        
    createImageParams(show: DetailedShow["recommendations"][0]): ImageParams {
        return {
            aspectRatio: {denominator: 3, numerator: 2},
            src: show.posterPath,
            type: "poster",
        }
    }


    getGenres(show: number[]): Genre[] {
        return this.configService.showGenres.filter(genre => {
            show.includes(genre.id)
        })
    }

    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }
}
