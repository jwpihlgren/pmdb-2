import { Component, inject } from '@angular/core';
import { DiscoverMoviesService } from '../../../../shared/services/discover-movies.service';

@Component({
  selector: 'app-discover-movies',
  imports: [],
  templateUrl: './discover-movies.component.html',
  styleUrl: './discover-movies.component.css'
})
export class DiscoverMoviesComponent {
    protected discoverService: DiscoverMoviesService = inject(DiscoverMoviesService)

    constructor() {
        this.discoverService.discover()
        const res = this.discoverService.request().subscribe()
    }
}
