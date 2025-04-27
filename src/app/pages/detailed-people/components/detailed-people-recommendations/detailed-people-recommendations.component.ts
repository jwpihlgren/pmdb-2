import { Component, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConfigService } from '../../../../shared/services/config.service';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { Location } from '@angular/common';
import { CreditedMovie, CreditedMovieActor, CreditedShow, CreditedShowActor } from '../../../../shared/models/interfaces/filmography.interface';

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
    credited: Signal<CreditedMovieActor[] | CreditedShowActor[] | undefined>
    mediaType = signal("Unknown media")

    constructor() {
        this.credited = toSignal(combineLatest(
            {
                url: this.activatedRoute.url,
                data: this.activatedRoute.parent!.data
            }
        ).pipe(
            map(forked => {
                const stub: "movies" | "shows" = forked.url.pop()!.path as unknown as "movies" | "shows"
                this.mediaType.set(stub)
                const data = forked.data["people"] as DetailedPeople
                if (stub === "movies") { return data.filmography.allMovies.filter(movie => Object.hasOwn(movie, "character")) as CreditedMovieActor[] }
                return data.filmography.allShows.filter(show => Object.hasOwn(show, "character")) as CreditedShowActor[]
            })
        ))
    }

    createImageParams(credit: CreditedShow | CreditedMovie): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            src: credit.posterImagePath,
            type: "poster"
        }
    }

    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }

}
