import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pagination } from '../../shared/models/interfaces/pagination';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ResultShow } from '../../shared/models/interfaces/result-show';
import { TrendingShowsService } from '../../shared/services/trending-shows.service';

@Component({
    selector: 'app-shows',
    standalone: true,
    imports: [RouterLink, PaginationComponent],
    templateUrl: './shows.component.html',
    styleUrl: './shows.component.css'
})
export class ShowsComponent {

    trendingShows: Signal<ResultShow[] | undefined>
    paginationResults: Signal<Pagination>
    protected trendingShowsService = inject(TrendingShowsService)
    protected activatedRoute = inject(ActivatedRoute)
    protected router = inject(Router)

    constructor() {
        const page = this.activatedRoute.snapshot.queryParamMap.get("page")
        if (!page) this.trendingShows = toSignal(this.trendingShowsService.get())
        else this.trendingShows = toSignal(this.trendingShowsService.get(+page))
        this.paginationResults = toSignal(this.trendingShowsService.getPaginationResults(), { requireSync: true })
    }

    paginate(page: number): void {
        this.trendingShowsService.set(page)
        this.router.navigate(["."], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: "replace",
            queryParams: { page: page }
        })
    }
}
