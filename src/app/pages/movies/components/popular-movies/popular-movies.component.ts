import { Component, inject, OnChanges, Signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { ContentMovieComponent } from '../../../../shared/components/card/components/content-movie/content-movie.component';
import { PopularMoviesService } from '../../../../shared/services/popular-movies.service';
import { ResultMovie } from '../../../../shared/models/interfaces/result-movie';
import { RoutingService } from '../../../../shared/services/routing.service';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { PrefetchService } from '../../../../shared/services/prefetch.service';
import { first, map, switchMap } from 'rxjs';
import { DetailedMovieService } from '../../../../shared/services/detailed-movie.service';
import { DetailedMovie } from '../../../../shared/models/interfaces/detailed-movie';
import { AppEventService } from '../../../../shared/services/app-event.service';

@Component({
    selector: 'app-popular-movies',
    imports: [PaginationComponent, CardComponent, ContentMovieComponent, CardGridComponent, CardLoadingComponent],
    templateUrl: './popular-movies.component.html',
    styleUrl: './popular-movies.component.css',
    standalone: true
})
export class PopularMoviesComponent {
    protected popularMoviesService: PopularMoviesService = inject(PopularMoviesService)
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected router: Router = inject(Router)
    protected routingService: RoutingService = inject(RoutingService)
    protected detailedMovieService: DetailedMovieService = inject(DetailedMovieService)
    protected prefetchService: PrefetchService<number> = inject(PrefetchService)
    protected appEventService: AppEventService = inject(AppEventService)

    popularMovies
    paginationResult
    prefetch: Signal<DetailedMovie | undefined>
    page: Signal<number | undefined>

    constructor() {
        this.prefetch = toSignal(this.prefetchService.prefetch$.pipe(
            switchMap(id => {
                return this.detailedMovieService.get(`${id}`)
            })
        ))
        this.page = toSignal(this.activatedRoute.queryParamMap.pipe(map(data => {
            const currentPage = data.get("page")
            if (!currentPage) return undefined
            if (currentPage) {
                this.popularMoviesService.get(+currentPage as number)
            }
            else {
                this.popularMoviesService.get()
            }
            return +currentPage as number
        })
        ))
        this.popularMovies = toSignal(this.popularMoviesService.get())
        this.paginationResult = toSignal(this.popularMoviesService.getPaginationResults(), { requireSync: true })
    }

    paginate(page: number): void {
        this.router.navigate(["."], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: "replace",
            queryParams: { page: page }
        })
        this.appEventService.emitEvent({ type: "PAGINATION", data: undefined })
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
