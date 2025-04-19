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

@Component({
    selector: 'app-popular-shows',
    imports: [CardGridComponent, CardComponent, ContentShowComponent, PaginationComponent, CardLoadingComponent],
    templateUrl: './popular-shows.component.html',
    styleUrl: './popular-shows.component.css'
})
export class PopularShowsComponent {
    popularShows: Signal<ResultShow[] | undefined>
    paginationResult: Signal<Pagination>
    protected popularShowsService: PopularShowsService = inject(PopularShowsService)
    protected activatedRoute = inject(ActivatedRoute)
    protected router = inject(Router)
    protected appEventService: AppEventService = inject(AppEventService)

    constructor() {
        const page = this.activatedRoute.snapshot.queryParamMap.get("page")
        if (!page) this.popularShows = toSignal(this.popularShowsService.get())
        else this.popularShows = toSignal(this.popularShowsService.get(+page))
        this.paginationResult = toSignal(this.popularShowsService.getPaginationResults(), { requireSync: true })
    }

    paginate(page: number): void {
        this.popularShowsService.set(page)
        this.router.navigate(["."], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: "replace",
            queryParams: { page: page }
        })

        this.appEventService.emitEvent({type: "PAGINATION", data: {}})
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
