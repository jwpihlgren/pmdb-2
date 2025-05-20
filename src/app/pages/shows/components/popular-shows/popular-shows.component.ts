import { Component, inject, Signal } from '@angular/core';
import { ResultShow } from '../../../../shared/models/interfaces/result-show';
import { Pagination } from '../../../../shared/models/interfaces/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { PopularShowsService } from '../../../../shared/services/popular-shows.service';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { ContentShowComponent } from '../../../../shared/components/card/components/content-show/content-show.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { AppEventService } from '../../../../shared/services/app-event.service';
import { DetailedShowService } from '../../../../shared/services/detailed-show.service';
import { PrefetchService } from '../../../../shared/services/prefetch.service';
import { first, map } from 'rxjs';

@Component({
    selector: 'app-popular-shows',
    imports: [CardGridComponent, CardComponent, ContentShowComponent, PaginationComponent, CardLoadingComponent],
    templateUrl: './popular-shows.component.html',
    styleUrl: './popular-shows.component.css'
})
export class PopularShowsComponent {

    protected popularShowsService: PopularShowsService = inject(PopularShowsService)
    protected detailedShowService: DetailedShowService = inject(DetailedShowService)
    protected prefetchService: PrefetchService<number> = inject(PrefetchService)
    protected activatedRoute = inject(ActivatedRoute)
    protected router = inject(Router)
    protected appEventService: AppEventService = inject(AppEventService)

    popularShows: Signal<ResultShow[] | undefined>
    paginationResult: Signal<Pagination>
    prefetchSignal: Signal<number | undefined>
    page: Signal<number | undefined>


    constructor() {
        this.popularShows = toSignal(this.popularShowsService.get())
        this.page = toSignal(this.activatedRoute.queryParamMap.pipe(
            map(data => {
                const currentPage = parseInt(data.get("page") ?? "")
                if (isNaN(currentPage)) {
                    this.popularShowsService.get()
                    return undefined
                }

                this.popularShowsService.get(currentPage)
                return currentPage
            })
        ))
        this.paginationResult = toSignal(this.popularShowsService.getPaginationResults(), { requireSync: true })
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
