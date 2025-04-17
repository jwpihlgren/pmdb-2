import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConfigService } from '../../../../shared/services/config.service';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Location } from '@angular/common';
import { CreditedMovieActor } from '../../../../shared/models/interfaces/filmography.interface';

@Component({
    selector: 'app-detailed-people-recommendations',
    imports: [RouterLink, ImageComponent],
    templateUrl: './detailed-people-recommendations.component.html',
    styleUrl: './detailed-people-recommendations.component.css'
})
export class DetailedPeopleRecommendationsComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    protected configService: ConfigService = inject(ConfigService)
    people: Signal<DetailedPeople>

    constructor() {
        this.people = toSignal(this.activatedRoute.parent!.data.pipe(
            tap(data => console.log(data)),
            map(data => data["people"] as DetailedPeople)), { requireSync: true })
    }

    createImageParams(people: CreditedMovieActor): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            src: people.posterImagePath,
            type: "poster"
        }
    }

    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }

}
