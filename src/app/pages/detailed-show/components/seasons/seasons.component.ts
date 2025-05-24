import { Component, inject, Signal } from '@angular/core';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DetailedShow } from '../../../../shared/models/interfaces/detailed-show';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { ConfigService } from '../../../../shared/services/config.service';

@Component({
  selector: 'app-seasons',
  imports: [RouterLink, ImageComponent],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    protected configService: ConfigService = inject(ConfigService)
    detailedShow: Signal<DetailedShow>

    constructor() {
        this.detailedShow = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                console.log(data)
                return data["show"] as DetailedShow
            })
        ), {requireSync: true})
    }


    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }


    createImageParams(season: DetailedShow["seasons"][0]): ImageParams {
        return {
            aspectRatio: {denominator: 3, numerator: 2},
            src: season.posterImagePath,
        }
    }
}
