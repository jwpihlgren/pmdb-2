import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PopularMoviesService } from '../../../../shared/services/popular-movies.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ContentMovieComponent } from '../../../../shared/components/card/components/content-movie/content-movie.component';

@Component({
    selector: 'app-popular-movies',
    imports: [PaginationComponent, CardComponent, ContentMovieComponent, CardGridComponent],
    templateUrl: './popular-movies.component.html',
    styleUrl: './popular-movies.component.css',
    standalone: true
})
export class PopularMoviesComponent {
    popularMovies
    paginationResult
    protected popularMoviesService: PopularMoviesService = inject(PopularMoviesService)
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected router: Router = inject(Router)

    constructor() {
        const page = this.activatedRoute.snapshot.queryParamMap.get("page")
        if (!page) this.popularMovies = toSignal(this.popularMoviesService.get())
        else this.popularMovies = toSignal(this.popularMoviesService.get(+page))
        this.paginationResult = toSignal(this.popularMoviesService.getPaginationResults(), { requireSync: true })
    }

    paginate(page: number): void {
        this.popularMoviesService.set(page)
        this.router.navigate(["."], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: "replace",
            queryParams: { page: page }
        })
    }


}
