import { Component, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../shared/services/config.service';
import DetailedPeople from '../../../../shared/models/interfaces/detailed-people';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { Location } from '@angular/common';
import { CreditedMovie, CreditedMovieActor } from '../../../../shared/models/interfaces/filmography.interface';
import { ListItemContentDirective, ListItemImageDirective, ListItemTitleDirective, SimpeListPageOptions, SimpleListPageComponent } from '../../../../shared/pages/simple-list-page/simple-list-page.component';

@Component({
    selector: 'app-detailed-people-cast-movie',
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
export class DetailedPeopleCastMovieComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    protected configService: ConfigService = inject(ConfigService)
    credited: Signal<CreditedMovieActor[] | undefined>
    mediaType = signal("Unknown media")

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

    createListParams(): SimpeListPageOptions {
        const options: SimpeListPageOptions = {
            title: `Credited moves`,
            linkFn: (credit: CreditedMovie) => {
                return ["/", "movies", `${credit.id}`]
            }
        }
        return options
    }

    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }
}

