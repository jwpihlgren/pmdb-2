import { Location } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailedMovie } from '../../../../shared/models/interfaces/detailed-movie';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';

@Component({
    selector: 'app-detailed-movie-cast',
    imports: [RouterLink, CardComponent],
    templateUrl: './detailed-movie-cast.component.html',
    styleUrl: './detailed-movie-cast.component.css'
})
export class DetailedMovieCastComponent {
    protected location: Location = inject(Location)
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    movie: Signal<DetailedMovie>

    constructor() {
        this.movie = toSignal(this.activatedRoute.parent!.data.pipe(
            map(movie => movie["movie"] as DetailedMovie)), { requireSync: true })
    }

    createParams(data: DetailedMovie["credits"]["cast"][0] | DetailedMovie["credits"]["crew"][0]): CardParams {
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
