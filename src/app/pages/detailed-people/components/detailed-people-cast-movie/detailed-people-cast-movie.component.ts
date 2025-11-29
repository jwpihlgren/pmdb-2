import { Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../shared/services/config.service';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { CreditedMovie, CreditedMovieActor } from '../../../../shared/models/interfaces/filmography.interface';
import {
    ListItemComponent,
    SimpleListPageOptions, SimpleListPageComponent
} from
    '../../../../shared/pages/simple-list-page/simple-list-page.component';

@Component({
    selector: 'app-detailed-people-cast-movie',
    imports: [ImageComponent, SimpleListPageComponent, ListItemComponent],
    template: `
<app-simple-list-page [back]="['../..']" [options]="listParams" [loaded]="!!credited()">
    @for(credit of credited(); track $index) {
    <app-list-item [link]="['/', 'movies', credit.id.toString()]">
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
`
})
export class DetailedPeopleCastMovieComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected configService: ConfigService = inject(ConfigService)
    credited: Signal<CreditedMovie[] | undefined>

    constructor() {
        this.credited = toSignal(combineLatest(
            {
                url: this.activatedRoute.url,
                data: this.activatedRoute.parent!.data
            }
        ).pipe(
            map(forked => {
                const data = forked.data["people"] as DetailedPeople
                return data.filmography.allMovies.filter(movie => Object.hasOwn(movie, "character")) as CreditedMovieActor[]
            })
        ))
    }

    createImageParams(credit: CreditedMovie): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            src: credit.posterImagePath,
            type: "poster"
        }
    }

    listParams: SimpleListPageOptions = {
        title: `Credited moves`,
    }
}
