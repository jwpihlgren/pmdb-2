import { Component, inject, Signal } from '@angular/core';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { SimpleListPageComponent, ListItemContentDirective, ListItemImageDirective, ListItemTitleDirective, SimpeListPageOptions } from '../../../../shared/pages/simple-list-page/simple-list-page.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { CreditedMovie, CreditedShowActor } from '../../../../shared/models/interfaces/filmography.interface';
import { ConfigService } from '../../../../shared/services/config.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-detailed-people-cast-show',
    imports: [ImageComponent, SimpleListPageComponent, ListItemContentDirective, ListItemImageDirective, ListItemTitleDirective],
    template: `
    @let cast = credited()!;
    <app-simple-list-page [options]="createListParams()" [items]="cast" [loaded]="!!credited()">
    <ng-template listItemImage let-item>
    <app-image [params]="createImageParams(item)"></app-image>
    </ng-template>
    <ng-template listItemTitle let-item>
        {{item.title}} as {{item.cast}}
    </ng-template>
    <ng-template listItemExtra let-item>
        {{item.releaseDate ? item.releaseDate : item.firstAirDate}})
    </ng-template>

    <ng-template listItemContent let-item>
        {{item.overview}}
    </ng-template>
    </app-simple-list-page>`,
})
export class DetailedPeopleCastShowComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    protected configService: ConfigService = inject(ConfigService)
    credited: Signal<CreditedShowActor[] | undefined>
    constructor() {
        this.credited = toSignal(combineLatest(
            {
                url: this.activatedRoute.url,
                data: this.activatedRoute.parent!.data
            }
        ).pipe(
            map(forked => {
                const data = forked.data["people"] as DetailedPeople
                return data.filmography.allShows.filter(show => Object.hasOwn(show, "character")) as CreditedShowActor[]
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

    createListParams(): SimpeListPageOptions {
        const options: SimpeListPageOptions = {
            title: `Credited shows`,
            linkFn: (credit: CreditedMovie) => {
                return ["/", "shows", `${credit.id}`]
            }
        }
        return options
    }

    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }

}

