import { Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeroSearchComponent } from '../../shared/components/hero-search/hero-search.component';
import { SearchMoviesService } from '../../shared/services/search-movies.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-movies',
    standalone: true,
    imports: [RouterOutlet, RouterLink, HeroSearchComponent],
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css'
})
export class MoviesComponent {

    searchResults: Signal<any>
    searchService: SearchMoviesService = inject(SearchMoviesService)

    constructor() { 
        this.searchResults = toSignal(this.searchService.searchResults$)
    }

    tabs = [
        { name: "trending", href: "trending" },
        { name: "popular", href: "popular" },
        { name: "discover", href: "discover" },
    ]

    search(query: string): void {
        this.searchService.search(query)
    }
}
