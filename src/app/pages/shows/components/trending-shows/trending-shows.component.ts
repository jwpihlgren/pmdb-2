import { Component, inject, Signal } from '@angular/core';
import { ResultShow } from '../../../../shared/models/interfaces/result-show';
import { Pagination } from '../../../../shared/models/interfaces/pagination';
import { TrendingShowsService } from '../../../../shared/services/trending-shows.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ContentShowComponent } from '../../../../shared/components/card/components/content-show/content-show.component';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { AppEventService } from '../../../../shared/services/app-event.service';
import { PrefetchService } from '../../../../shared/services/prefetch.service';
import { first, map } from 'rxjs';
import { DetailedShowService } from '../../../../shared/services/detailed-show.service';
import { SimpleGridComponent } from '../../../../shared/components/simple-grid/simple-grid.component';

@Component({
    selector: 'app-trending-shows',
    imports: [CardComponent, PaginationComponent, ContentShowComponent, CardLoadingComponent, SimpleGridComponent],
    templateUrl: './trending-shows.component.html',
    styleUrl: './trending-shows.component.css'
})
export class TrendingShowsComponent {

    protected trendingShowsService = inject(TrendingShowsService)
    protected detailedShowService = inject(DetailedShowService)
    protected activatedRoute = inject(ActivatedRoute)
    protected router = inject(Router)
    protected appEventService: AppEventService = inject(AppEventService)
    protected prefetchService: PrefetchService<number> = inject(PrefetchService)

    trendingShows: Signal<ResultShow[] | undefined>
    paginationResult: Signal<Pagination>
    prefetchSignal: Signal<number | undefined>
    page: Signal<number | undefined>
    cardMaxWidth = "250px"


    constructor() {
        this.trendingShows = toSignal(this.trendingShowsService.get())
        this.page = toSignal(this.activatedRoute.queryParamMap.pipe(
            map(data => {
                const currentPage = parseInt(data.get("page") ?? "")
                if (isNaN(currentPage)) {
                    this.trendingShowsService.get()
                    return undefined
                }
                this.trendingShowsService.get(currentPage)
                return currentPage
            })
        ))
        this.paginationResult = toSignal(this.trendingShowsService.getPaginationResults(), { requireSync: true })
        this.prefetchSignal = toSignal(this.prefetchService.prefetch$.pipe(
            map(id => {
                this.detailedShowService.get(id.toString()).pipe(first()).subscribe()
                return id
            })
        ))
    }

    paginate(page: number): void {
        this.router.navigate(["."], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: "replace",
            queryParams: { page: page }
        })
        this.appEventService.emitEvent({ type: "PAGINATION", data: {} })
    }

    createCardParams(result: ResultShow): CardParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            direction: "vertical",
            imageType: "poster",
            href: ["/", "shows", `${result.id}`],
            id: result.id,
            imageSrc: result.posterImageUrl,
            mediaType: "show"
        }
    }

}
