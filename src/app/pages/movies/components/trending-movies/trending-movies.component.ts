import { Component, inject, Signal } from '@angular/core';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Pagination } from '../../../../shared/models/interfaces/pagination';
import { TrendingMoviesService } from '../../../../shared/services/trending-movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { ContentMovieComponent } from '../../../../shared/components/card/components/content-movie/content-movie.component';
import { ResultMovie } from '../../../../shared/models/interfaces/result-movie';
import { RoutingService } from '../../../../shared/services/routing.service';

@Component({
    selector: 'app-trending-movies',
    imports: [CardGridComponent, PaginationComponent, CardComponent, ContentMovieComponent],
    templateUrl: './trending-movies.component.html',
    styleUrl: './trending-movies.component.css',
    standalone: true
})
export class TrendingMoviesComponent {

    trendingMovies: Signal<ResultMovie[] | undefined>
    paginationResult: Signal<Pagination>
    protected trendingMoviesService: TrendingMoviesService = inject(TrendingMoviesService)
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected router: Router = inject(Router)
    protected routingService: RoutingService = inject(RoutingService)

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

    createCardParams(movie: ResultMovie): CardParams {
        const params: CardParams = {
            imageType: "poster",
            direction: "vertical",
            id: movie.id,
            mediaType: "movie",
            imageSrc: movie.posterImagePath,
            href: ["/", this.routingService.stubs.MOVIE, `${movie.id}`]
        }

        return params
    }

}
