import { Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeroSearchComponent } from '../../shared/components/hero-search/hero-search.component';
import { SearchMoviesService } from '../../shared/services/search-movies.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResultMovie } from '../../shared/models/interfaces/result-movie';
import { ImageComponent, ImageParams } from '../../shared/components/image/image.component';

@Component({
    selector: 'app-movies',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, HeroSearchComponent, ImageComponent],
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css'
})
export class MoviesComponent {

    searchResults: Signal<ResultMovie[]>
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

    createImageParams(result: ResultMovie): ImageParams {
        return {
            aspectRatio: {numerator: 2, denominator: 3},
            src: result.posterImagePath,
            type: "poster"
        }
    }
}
