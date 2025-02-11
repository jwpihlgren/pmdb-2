import { Component, inject } from '@angular/core';
import { DiscoverMoviesService } from '../../../../shared/services/discover-movies.service';

@Component({
  selector: 'app-search-movies',
  imports: [],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css'
})
export class SearchMoviesComponent {
    protected discoverService: DiscoverMoviesService = inject(DiscoverMoviesService)


    constructor() {
        this.discoverService.discover()
        const res = this.discoverService.request().subscribe()
    }
}
