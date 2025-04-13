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

@Component({
    selector: 'app-popular-shows',
    imports: [CardGridComponent, CardComponent, ContentShowComponent, PaginationComponent],
    templateUrl: './popular-shows.component.html',
    styleUrl: './popular-shows.component.css'
})
export class PopularShowsComponent {
    popularShows: Signal<ResultShow[] | undefined>
    paginationResult: Signal<Pagination>
    protected popularShowsService: PopularShowsService = inject(PopularShowsService)
    protected activatedRoute = inject(ActivatedRoute)
    protected router = inject(Router)

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
    }

    createCardParams(result: ResultShow): CardParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            direction: "vertical",
            imageType: "poster",
            href: [`${result.id}`],
            id: result.id,
            imageSrc: result.posterImageUrl,
            mediaType: "show"
        }
    }
}
