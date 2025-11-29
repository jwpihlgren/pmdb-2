import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedShow } from '../../../../shared/models/interfaces/detailed-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AppEventTriggerDirective } from '../../../../shared/directives/app-event-trigger.directive';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { ConfigService } from '../../../../shared/services/config.service';
import { Location } from '@angular/common';
import { SimpleListPageComponent, ListItemComponent, SimpleListPageOptions } from
    "../../../../shared/pages/simple-list-page/simple-list-page.component";
import { ChipListComponent } from "../../../../shared/components/chip-list/chip-list.component";

@Component({
    selector: 'app-detailed-show-recommendations',
    imports: [ImageComponent, ChipComponent, SimpleListPageComponent, ListItemComponent, ChipListComponent],
    template: `
<app-simple-list-page  [options]="listParams" [back]="['../']" [loaded]="!!detailedShow()">
    @for(recommendation of detailedShow().recommendations; track $index) {
    <app-list-item [link]="['/', 'shows', recommendation.id.toString()]">
        <ng-container slot="image">
            <app-image [params]=createImageParams(recommendation)></app-image>
        </ng-container>
        <ng-container slot="title">
            {{recommendation.name}} ({{recommendation.firstAirDate}})
        </ng-container>
        <ng-container slot="content">
            {{recommendation.overview}}
            <app-chip-list>
                @for(g of getGenres(recommendation.genreIds); track $index) {
                <app-chip [value]="g.id.toString()">{{g.name}}</app-chip>
                }
            </app-chip-list>
        </ng-container>
    </app-list-item>
    }
</app-simple-list-page>
`,
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
            aspectRatio: { denominator: 3, numerator: 2 },
            src: show.posterPath,
            type: "poster",
        }
    }
    
    listParams: SimpleListPageOptions = {
        title: "Recommendations"
    }


    getGenres(show: number[]): Genre[] {
        return this.configService.showGenres.filter(genre => show.includes(genre.id))
    }
}
