import { Component, Signal } from '@angular/core';
import { TrendingMoviesService } from '../../shared/services/trending-movies.service';
import { TrendingMovie } from '../../shared/models/interfaces/trending-movie';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pagination } from '../../shared/models/interfaces/pagination';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CardMovieComponent } from '../../shared/components/card-movie/card-movie.component';

@Component({
    selector: 'app-movies',
    standalone: true,
    imports: [RouterLink, PaginationComponent, CardMovieComponent],
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css'
})
export class MoviesComponent {

    trendingMovies: Signal<TrendingMovie[] | undefined>
    paginationResult: Signal<Pagination>

    constructor(
        private trendingMoviesService: TrendingMoviesService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
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
