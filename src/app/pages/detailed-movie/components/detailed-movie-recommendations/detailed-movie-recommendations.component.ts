import { Component, inject, Signal } from '@angular/core';
import { DetailedMovie } from '../../../../shared/models/interfaces/detailed-movie';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ImageComponent, ImageParams } from '../../../../shared/components/image/image.component';
import { ResultMovie } from '../../../../shared/models/interfaces/result-movie';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { ConfigService } from '../../../../shared/services/config.service';
import { Location } from '@angular/common';
import { AppEventTriggerDirective } from '../../../../shared/directives/app-event-trigger.directive';
import { SimpleListPageComponent, SimpleListPageOptions, ListItemComponent } from
    '../../../../shared/pages/simple-list-page/simple-list-page.component';
import { ChipListComponent } from "../../../../shared/components/chip-list/chip-list.component";

@Component({
    selector: 'app-detailed-movie-recommendations',
    imports: [ImageComponent, ChipComponent, SimpleListPageComponent, ListItemComponent, ChipListComponent],
    template: `
<app-simple-list-page [back]="['../']" [loaded]="!!movie()">
    @for(recommendation of movie().recommendations.results; track $index) {
    <app-list-item [link]="['/', 'movies', recommendation.id.toString()]">
        <ng-container slot="image">
            <app-image [params]=createImageParams(recommendation)></app-image>
        </ng-container>
        <ng-container slot="title">
            {{recommendation.title}} ({{recommendation.releaseDate}})
        </ng-container>
        <ng-container slot="content">
            {{recommendation.overview}}
            <app-chip-list>
                @for(g of getGenres(recommendation); track $index) {
                <app-chip [value]="g.id.toString()">{{g.name}}</app-chip>
                }
            </app-chip-list>
        </ng-container>
    </app-list-item>
    }
</app-simple-list-page>
`,
    hostDirectives: [
        AppEventTriggerDirective
    ]
})
export class DetailedMovieRecommendationsComponent {
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected location: Location = inject(Location)
    protected configService: ConfigService = inject(ConfigService)
    movie: Signal<DetailedMovie>

    constructor() {
        this.movie = toSignal(this.activatedRoute.parent!.data.pipe(
            map(data => data["movie"] as DetailedMovie)), { requireSync: true })
    }

    createImageParams(movie: ResultMovie): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            src: movie.posterImagePath,
            type: "poster"
        }
    }


    listParams: SimpleListPageOptions = {
        title: "Recommendations",
    }

    getGenres(movie: ResultMovie): Genre[] {
        return this.configService.movieGenres.filter(genre => {
            return movie.genreIds.includes(genre.id)
        })
    }
}
