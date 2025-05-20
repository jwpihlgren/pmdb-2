import { Component, inject, output, Signal } from '@angular/core';
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
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { DetailedMovieService } from '../../../../shared/services/detailed-movie.service';
import { first, map } from 'rxjs';
import { PrefetchService } from '../../../../shared/services/prefetch.service';
import { AppEventService } from '../../../../shared/services/app-event.service';

@Component({
    selector: 'app-trending-movies',
    imports: [CardGridComponent, PaginationComponent, CardComponent, ContentMovieComponent, CardLoadingComponent],
    templateUrl: './trending-movies.component.html',
    styleUrl: './trending-movies.component.css',
    standalone: true
})
export class TrendingMoviesComponent {

    protected trendingMoviesService: TrendingMoviesService = inject(TrendingMoviesService)
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected router: Router = inject(Router)
    protected routingService: RoutingService = inject(RoutingService)
    protected detailedMovieServie: DetailedMovieService = inject(DetailedMovieService)
    protected prefetchService: PrefetchService<number> = inject(PrefetchService)
    protected appEventService: AppEventService = inject(AppEventService)

    trendingMovies: Signal<ResultMovie[] | undefined>
    paginationResult: Signal<Pagination>
    page: Signal<number | undefined>
    prefetch: Signal<number | undefined>

    constructor() {
        this.prefetch = toSignal(this.prefetchService.prefetch$.pipe(
            map(id => {
                this.detailedMovieServie.get(`${id}`).pipe(first()).subscribe()
                return id
            })
        ))
        this.page = toSignal(this.activatedRoute.queryParamMap.pipe(
            map(data => {
                const page = data.get("page") ?? undefined
                if(page && typeof parseInt(page) === "number") {}
                else {}
                return page
            })
        ))
        this.trendingMovies = toSignal(this.trendingMoviesService.get())
        this.paginationResult = toSignal(this.trendingMoviesService.getPaginationResults(), { requireSync: true })
    }

    paginate(page: number): void {
        this.trendingMoviesService.set(page)
        this.router.navigate(["."], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: "replace",
            queryParams: { page: page }
        })
        this.appEventService.emitEvent({type: "PAGINATION", data: undefined})
    }

    createCardParams(movie: ResultMovie): CardParams {
        const params: CardParams = {
            imageType: "poster",
            direction: "vertical",
            id: movie.id,
            mediaType: "movie",
            imageSrc: movie.posterImagePath,
            href: ["/", this.routingService.stubs.MOVIE, `${movie.id}`],
            aspectRatio: { numerator: 2, denominator: 3 }
        }

        return params
    }
}
