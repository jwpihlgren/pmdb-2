import { Component, inject, Signal } from '@angular/core';
import { HeroSearchComponent } from '../../shared/components/hero-search/hero-search.component';
import { SearchMultiService } from '../../shared/search-multi.service';
import { toSignal } from '@angular/core/rxjs-interop';
import ResultMulti from '../../shared/models/interfaces/result-multi';
import { ImageComponent, ImageParams } from '../../shared/components/image/image.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroSearchComponent, ImageComponent, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    searchMultiServie: SearchMultiService = inject(SearchMultiService)
    searchResults: Signal<ResultMulti[] | undefined>

    constructor() {
        this.searchResults = toSignal(this.searchMultiServie.searchResults$)
    }

    search(query: string) {
        this.searchMultiServie.find(query)
    }

    createImageParams(result: ResultMulti): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            src: result.posterPath,
            type: "poster"
        }
    }
}
