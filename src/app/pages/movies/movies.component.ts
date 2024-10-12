import { Component, Signal } from '@angular/core';
import { TrendingMoviesService } from '../../shared/services/trending-movies.service';
import { TrendingMovie } from '../../shared/models/interfaces/trending-movie';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Pagination } from '../../shared/models/interfaces/pagination';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink, PaginationComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

    trendingMovies: Signal<TrendingMovie[] | undefined>
    pagination: Signal<Pagination>

    constructor(private trendingMoviesService: TrendingMoviesService){
        this.trendingMovies = toSignal(this.trendingMoviesService.get())
        this.pagination = toSignal(this.trendingMoviesService.getPaginationResults(), {requireSync: true})
    }

    paginate(page: number): void {
        console.log("click", page)

        this.trendingMoviesService.set(page)
    }
}
