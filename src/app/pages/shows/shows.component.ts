import { Component, Signal } from '@angular/core';
import { TrendingShowsService } from '../../shared/services/trending-shows.service';
import { TrendingShow } from '../../shared/models/interfaces/trending-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pagination } from '../../shared/models/interfaces/pagination';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
    selector: 'app-shows',
    standalone: true,
    imports: [RouterLink, PaginationComponent],
    templateUrl: './shows.component.html',
    styleUrl: './shows.component.css'
})
export class ShowsComponent {

    trendingShows: Signal<TrendingShow[] | undefined>
    paginationResults: Signal<Pagination>

    constructor(
        private trendingShowsService: TrendingShowsService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
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
