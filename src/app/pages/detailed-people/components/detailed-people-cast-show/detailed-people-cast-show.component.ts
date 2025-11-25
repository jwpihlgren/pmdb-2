import { Component, inject, Signal } from '@angular/core';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import {
    SimpleListPageComponent, SimpleListPageOptions, ListItemComponent
} from '../../../../shared/pages/simple-list-page/simple-list-page.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { CreditedShow } from
    '../../../../shared/models/interfaces/filmography.interface';
import { ConfigService } from '../../../../shared/services/config.service';

@Component({
    selector: 'app-detailed-people-cast-show',
    imports: [ImageComponent, SimpleListPageComponent, ListItemComponent],
    template: `
<app-simple-list-page [options]="listParams" [loaded]="!!credited()">
    @for(credit of credited(); track $index) {
    <app-list-item [link]="['/', 'shows', credit.id.toString()]">
        <ng-container slot="image">
            <app-image [params]=createImageParams(credit)></app-image>
        </ng-container>
        <ng-container slot="title">
            {{credit.title}} as {{credit.creditType === "crew" ? credit.job : credit.character}}
        </ng-container>
        <ng-container slot="content">
            {{credit.overview}}
        </ng-container>
    </app-list-item>
    }
</app-simple-list-page>
`,
})
export class DetailedPeopleCastShowComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected configService: ConfigService = inject(ConfigService)
    credited: Signal<CreditedShow[] | undefined>
    constructor() {
        this.credited = toSignal(combineLatest(
            {
                url: this.activatedRoute.url,
                data: this.activatedRoute.parent!.data
            }
        ).pipe(
            map(forked => {
                const data = forked.data["people"] as DetailedPeople
                return data.filmography.allShows.filter(show => Object.hasOwn(show, "character")) as CreditedShow[]
            })
        ))
    }

    createImageParams(credit: CreditedShow): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            src: credit.posterImagePath,
            type: "poster"
        }
    }

    listParams: SimpleListPageOptions = {
        title: `Credited shows`,
    }
}
