import { Component, inject, Signal } from '@angular/core';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { TrendingMovie } from '../../../../shared/models/interfaces/trending-movie';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Pagination } from '../../../../shared/models/interfaces/pagination';
import { TrendingMoviesService } from '../../../../shared/services/trending-movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ContentMovieComponent } from '../../../../shared/components/card/components/content-movie/content-movie.component';

@Component({
    selector: 'app-trending-movies',
    imports: [CardGridComponent, PaginationComponent, CardComponent, ContentMovieComponent],
    templateUrl: './trending-movies.component.html',
    styleUrl: './trending-movies.component.css',
    standalone: true
})
export class TrendingMoviesComponent {

    trendingMovies: Signal<TrendingMovie[] | undefined>
    paginationResult: Signal<Pagination>
    protected trendingMoviesService: TrendingMoviesService = inject(TrendingMoviesService)
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected router: Router = inject(Router)

    constructor() {
        const page = this.activatedRoute.snapshot.queryParamMap.get("page")
        if (!page) this.trendingMovies = toSignal(this.trendingMoviesService.get())
        else this.trendingMovies = toSignal(this.trendingMoviesService.get(+page))
        this.paginationResult = toSignal(this.trendingMoviesService.getPaginationResults(), { requireSync: true })
    }

    paginate(page: number): void {
        this.trendingMoviesService.set(page)
        this.router.navigate(["."], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: "replace",
            queryParams: { page: page }
        })
    }

}
