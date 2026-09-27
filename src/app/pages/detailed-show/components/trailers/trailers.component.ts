import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SimpleGridComponent } from '../../../../shared/components/simple-grid/simple-grid.component';
import { ExternalVideoPlayerComponent, ExternalVideoPlayerParams } from '../../../../shared/components/external-video-player/external-video-player.component';
import { DetailedShow } from '../../../../shared/models/interfaces/detailed-show';
import Trailer from '../../../../shared/models/interfaces/trailer';

@Component({
    selector: 'app-trailers',
    imports: [RouterLink, SimpleGridComponent, ExternalVideoPlayerComponent],
    templateUrl: './trailers.component.html',
    styleUrl: './trailers.component.css'
})
export class TrailersComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    trailers: Signal<DetailedShow["trailers"]>

    constructor() {
        this.trailers = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                return data['show']['trailers'] as DetailedShow["trailers"]
            })
        ), { requireSync: true })
    }

    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }

    createTrailerParams(trailer: Trailer): ExternalVideoPlayerParams {
        return { site: trailer.site, key: trailer.key, name: trailer.name, type: trailer.type }
    }
}
