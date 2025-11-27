import { Component, inject, Signal } from '@angular/core';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { ActivatedRoute } from '@angular/router';
import { DetailedShow } from '../../../../shared/models/interfaces/detailed-show';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { ConfigService } from '../../../../shared/services/config.service';
import { SimpleListPageComponent, ListItemComponent, SimpleListPageOptions } from
    "../../../../shared/pages/simple-list-page/simple-list-page.component";

@Component({
    selector: 'app-seasons',
    imports: [ImageComponent, ListItemComponent, SimpleListPageComponent],
    template: `
<app-simple-list-page [back]="['../']" [options]="listParams" [loaded]="!!detailedShow()">
    @for(season of detailedShow().seasons; track $index) {
    <app-list-item [link]="['./', season.seasonNumber.toString()]">
        <ng-container slot="image">
            <app-image [params]=createImageParams(season)></app-image>
        </ng-container>
        <ng-container slot="title">
            {{season.name}} ({{season.episodeCount}} episodes)
        </ng-container>
        <ng-container slot="content">
            {{season.overview}}
        </ng-container>
    </app-list-item>
    }
</app-simple-list-page>
`,
})
export class SeasonsComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    protected configService: ConfigService = inject(ConfigService)
    detailedShow: Signal<DetailedShow>

    constructor() {
        this.detailedShow = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => {
                return data["show"] as DetailedShow
            })
        ), { requireSync: true })
    }


    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }


    createImageParams(season: DetailedShow["seasons"][0]): ImageParams {
        return {
            aspectRatio: { denominator: 3, numerator: 2 },
            src: season.posterImagePath,
        }
    }

    listParams: SimpleListPageOptions = {
        title: "Seasons"
    }
}
