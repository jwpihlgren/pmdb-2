import { Component, inject, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { HeroSearchComponent } from '../../shared/components/hero-search/hero-search.component';
import { SearchMultiService } from '../../shared/search-multi.service';
import { toSignal } from '@angular/core/rxjs-interop';
import ResultMulti from '../../shared/models/interfaces/result-multi';
import { ImageComponent, ImageParams } from '../../shared/components/image/image.component';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroSearchComponent, ImageComponent, RouterLink, NgTemplateOutlet, ReactiveFormsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {

    SEARCH_HISTORY_ITEM_IDENTIFIER = "searchHistoryItem"
    searchMultiService: SearchMultiService = inject(SearchMultiService)
    searchResults: Signal<ResultMulti[] | undefined>
    searchHistory: Signal<string[] | undefined>
    searchHasFocus: WritableSignal<boolean> = signal(false)

    searchInput: FormControl<string> = new FormControl("", { nonNullable: true })

    constructor() {
        this.searchResults = toSignal(this.searchMultiService.searchResults$)
        this.searchHistory = toSignal(this.searchMultiService.searchHistory$)
    }

    search(query: string) {
        this.searchMultiService.find(query)
    }
    clear(_: Event) {
        this.searchMultiService.clear()
    }

    onFocus(_: Event): void {
        this.searchHasFocus.set(true)
    }

    onBlur(event: FocusEvent): void {
        if (event.relatedTarget) {
            const relatedTarget = event.relatedTarget as HTMLElement
            const attributeMap = relatedTarget.dataset as Record<string, string>
            if (attributeMap["type"] === this.SEARCH_HISTORY_ITEM_IDENTIFIER) {
                relatedTarget.click()
            }
        }
        this.searchHasFocus.set(false)
    }

    onHistoryClick(event: Event): void {
        const element = event.target as HTMLElement
        const query = element.textContent ?? ""
        this.searchMultiService.find(query)
        this.searchMultiService.addToSearchHistory(query)
        this.searchInput.setValue(query)
    }

    addToSearchHistory(name: string): void {
        this.searchMultiService.addToSearchHistory(name)
    }

    createImageParams(result: ResultMulti): ImageParams {
        return {
            aspectRatio: { numerator: 2, denominator: 3 },
            src: result.posterPath,
            type: "poster"
        }
    }

    ngOnDestroy(): void {
        this.searchMultiService.clear()
    }
}
