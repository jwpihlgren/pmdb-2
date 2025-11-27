import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailedShow, DetailedShowCredits } from '../../../../shared/models/interfaces/detailed-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { Location } from '@angular/common';
import { AppEventTriggerDirective } from '../../../../shared/directives/app-event-trigger.directive';
import { SimpleGridComponent } from '../../../../shared/components/simple-grid/simple-grid.component';

@Component({
    selector: 'app-detailed-show-cast',
    imports: [RouterLink, CardComponent, SimpleGridComponent],
    templateUrl: './detailed-show-cast.component.html',
    styleUrl: './detailed-show-cast.component.css',
    hostDirectives: [AppEventTriggerDirective]
})
export class DetailedShowCastComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)

    detailedShow: Signal<DetailedShow>

    constructor() {
        this.detailedShow = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                return data["show"] as DetailedShow
            })
        ), { requireSync: true })
    }

    createParams(data: DetailedShowCredits["cast"][0] | DetailedShowCredits["crew"][0]): CardParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            direction: "vertical",
            imageType: "profile",
            href: ["/", "people", data.id.toString()],
            id: data.id,
            imageSrc: data.profilePath,
            mediaType: "person"
        }
    }

    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }


}
