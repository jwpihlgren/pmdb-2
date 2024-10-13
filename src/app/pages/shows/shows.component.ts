import { Component, Signal } from '@angular/core';
import { TrendingShowsService } from '../../shared/services/trending-shows.service';
import { TrendingShow } from '../../shared/models/interfaces/trending-show';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pagination } from '../../shared/models/interfaces/pagination';
import { RouterLink } from '@angular/router';
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

    constructor(private trendingShowsService: TrendingShowsService) {
        this.trendingShows = toSignal(this.trendingShowsService.get())
        this.paginationResults = toSignal(this.trendingShowsService.getPaginationResults(), {requireSync: true})
    }

    paginate(page: number): void {
        console.log(page)
        this.trendingShowsService.set(page)
    }


}
