import { Component, inject, Signal } from '@angular/core';
import { ResultShow } from '../../../../shared/models/interfaces/result-show';
import { Pagination } from '../../../../shared/models/interfaces/pagination';
import { TrendingShowsService } from '../../../../shared/services/trending-shows.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ContentShowComponent } from '../../../../shared/components/card/components/content-show/content-show.component';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { AppEventService } from '../../../../shared/services/app-event.service';

@Component({
    selector: 'app-trending-shows',
    imports: [CardGridComponent, CardComponent, PaginationComponent, ContentShowComponent, CardLoadingComponent],
    templateUrl: './trending-shows.component.html',
    styleUrl: './trending-shows.component.css'
})
export class TrendingShowsComponent {
    trendingShows: Signal<ResultShow[] | undefined>
    paginationResult: Signal<Pagination>
    protected trendingShowsService = inject(TrendingShowsService)
    protected activatedRoute = inject(ActivatedRoute)
    protected router = inject(Router)
    protected appEventService: AppEventService = inject(AppEventService)

    constructor() {
        const page = this.activatedRoute.snapshot.queryParamMap.get("page")
        if (!page) this.trendingShows = toSignal(this.trendingShowsService.get())
        else this.trendingShows = toSignal(this.trendingShowsService.get(+page))
        this.paginationResult = toSignal(this.trendingShowsService.getPaginationResults(), { requireSync: true })
    }

    paginate(page: number): void {
        this.trendingShowsService.set(page)
        this.router.navigate(["."], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: "replace",
            queryParams: { page: page }
        })
        this.appEventService.emitEvent({type : "PAGINATION", data: {}})
    }

    createCardParams(result: ResultShow): CardParams {
        return {
            aspectRatio: {numerator: 2, denominator: 3},
            direction: "vertical",
            imageType: "poster",
            href: ["/", "shows",`${result.id}`],
            id: result.id,
            imageSrc: result.posterImageUrl,
            mediaType: "show"
        }
    }

}
