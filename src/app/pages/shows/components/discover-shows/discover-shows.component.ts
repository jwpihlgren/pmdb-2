import { Component, computed, inject } from '@angular/core';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { AppEventService } from '../../../../shared/services/app-event.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../../../../shared/services/config.service';
import { RoutingService } from '../../../../shared/services/routing.service';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DiscoverShowFormValue } from '../../../../shared/models/interfaces/discover-show-form-value';
import { ResultShow } from '../../../../shared/models/interfaces/result-show';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { ComboboxComponent } from '../../../../shared/components/combobox/combobox.component';
import { ChipListComponent } from '../../../../shared/components/chip-list/chip-list.component';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ContentShowComponent } from '../../../../shared/components/card/components/content-show/content-show.component';
import { ComboboxItemComponent } from '../../../../shared/components/combobox/components/combobox-item.component';
import { DropdownListComponent } from '../../../../shared/components/drop-down-list/dropdown-list.component';
import { ExpandableMultiSelectComponent } from '../../../../shared/components/expandable-multi-select/expandable-multi-select.component';
import { Selectable } from '../../../../shared/models/interfaces/selectable';
import { KeywordService } from '../../../../shared/services/keyword.service';
import { SelectItemComponent } from '../../../../shared/components/expandable-multi-select/components/select-item/select-item.component';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input.component';
import { SimpleGridComponent } from '../../../../shared/components/simple-grid/simple-grid.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscoverShowResult, DiscoverShowService } from '../../../../shared/services/discover/show/discover-show.service';

@Component({
    selector: 'app-discover-shows',
    imports: [ReactiveFormsModule, SimpleGridComponent, CardComponent, ContentShowComponent, ComboboxComponent, ChipListComponent, ChipComponent, PaginationComponent, CardLoadingComponent, ComboboxComponent, ComboboxItemComponent, DropdownListComponent, ExpandableMultiSelectComponent, SelectItemComponent, TextInputComponent],
    templateUrl: './discover-shows.component.html',
    styleUrl: './discover-shows.component.css'
})
export class DiscoverShowsComponent {

    protected formBuilder = inject(FormBuilder)
    protected discoverService = inject(DiscoverShowService)
    protected configService: ConfigService = inject(ConfigService)
    protected routingService: RoutingService = inject(RoutingService)
    protected appEventService: AppEventService = inject(AppEventService)
    protected keywordService: KeywordService = inject(KeywordService)
    protected activatedRoute: ActivatedRoute = inject(ActivatedRoute)
    protected router: Router = inject(Router)

    genres!: Genre[]
    listboxParams!: { list: string[] }
    cardMaxWidth = "250px"
    years: number[] = this.generateNumberRange(new Date().getFullYear(), 1900)

    results = toSignal<DiscoverShowResult>(this.discoverService.results)


    voteAverageOptions = {
        list: this.generateNumberRange(1, 10).map(n => {
            return {
                name: n + "", value: n
            }
        })
    }
    yearOptions = {
        list: this.generateNumberRange(new Date().getFullYear(), 1900).map(n => {
            return { name: n + "", value: n }
        })
    }

    discoverForm = this.formBuilder.group({
        includeAdult: this.formBuilder.control<boolean | null>(null),
        includeVideo: this.formBuilder.control<boolean | null>(null),
        sortBy: this.formBuilder.control<string | undefined>(undefined),
        page: this.formBuilder.control<number | undefined>(undefined),
        firstAirDateLte: this.formBuilder.control<string | undefined>(undefined),
        firstAirDateGte: this.formBuilder.control<string | undefined>(undefined),
        voteAverageLte: this.formBuilder.control<string | undefined>(undefined),
        voteAverageGte: this.formBuilder.control<string | undefined>(undefined),
        withGenres: this.formBuilder.group({
            values: this.formBuilder.control<string[]>([]),
            operator: this.formBuilder.control<"and" | "or">("and")
        }),
        withKeywords: this.formBuilder.group({
            values: this.formBuilder.control<string[]>([]),
            operator: this.formBuilder.control<"and" | "or">("and")
        })
    });



    keywordForm = this.formBuilder.group({
        keyword: this.formBuilder.nonNullable.control("")
    })

    keywordSearchSignal = toSignal<string>(this.keywordForm.controls.keyword.valueChanges)
    keywordSearchResult = computed(() => {
        return this.keywordService.search(
            this.keywordSearchSignal() || "",
            10,
            this.discoverForm.controls.withKeywords.controls.values.getRawValue() ?? []).map((k) => ({
                value:
                    k.id.toString(), name: k.name
            }))
    })

    constructor() {
        this.genres = this.configService.showGenres;
        this.listboxParams = { list: this.genres.map(g => g.id) };

        this.activatedRoute.queryParamMap
            .pipe(takeUntilDestroyed())
            .subscribe(() => {
                this.discoverService.adoptFromUrl(this.activatedRoute.snapshot, this.discoverForm);
            });
    }

    lookupKeyword(id: string): string {
        return this.keywordService.keywordNameById(id) ?? id
    }


    getGenre(id: string): Genre | undefined {
        const genre = this.configService.movieGenres.find(g => g.id.toString() === id.toString())
        return genre
    }

    onSubmit(): void {
        this.discoverService.setFilters(this.discoverForm.getRawValue())
    }

    onUpdateAndSubmit(page: number): void {
        this.discoverForm.controls.page.setValue(page)
        this.onSubmit()
    }

    onKeywordSubmit(): void {
        const formValue = this.keywordForm.controls["keyword"].getRawValue()
        if (!formValue) return
        const previousValues = this.discoverForm.controls.withKeywords.controls["values"].getRawValue() ?? []
        this.discoverForm.controls.withKeywords.controls.values.setValue([...previousValues, formValue])
        this.keywordForm.reset()
    }

    onKeywordSelect(keyword: string): void {
        const previousValues = this.discoverForm.controls.withKeywords.controls["values"].getRawValue() ?? []
        this.discoverForm.controls.withKeywords.controls.values.setValue([...previousValues, keyword])
        this.keywordForm.reset()
    }

    onGenreToggle(genre: string): void {
        const selectedGenres: string[] = this.discoverForm.controls.withGenres.get("values")?.getRawValue()
        const existingIndex = selectedGenres.findIndex(g => g === genre)
        if (existingIndex !== -1) {
            selectedGenres.splice(existingIndex, 1)
            this.discoverForm.controls.withGenres.get("values")?.setValue(selectedGenres)
            return
        }
        this.discoverForm.controls.withGenres.get("values")?.setValue(Array.from(new Set([...selectedGenres, genre])))
    }

    onGenreRemove(genre: string): void {
        const selectedGenres: string[] = this.discoverForm.controls.withGenres.get("values")?.getRawValue()
        const existingIndex = selectedGenres.findIndex(g => {
            console.log(g, genre)
            return g.toString() === genre.toString()
        })
        if (existingIndex !== -1) {
            selectedGenres.splice(existingIndex, 1)
            this.discoverForm.controls.withGenres.get("values")?.setValue(selectedGenres)

        }
    }

    onKeywordRemove(index: number): void {
        const previousValues = [...this.discoverForm.controls.withKeywords.controls.values.getRawValue() ?? []]
        previousValues.splice(index, 1)
        this.discoverForm.controls.withKeywords.controls.values.setValue(previousValues)
    }

    generateNumberRange(start: number, end: number, step: number = 1): number[] {

        const reverse: boolean = start > end
        const range: number[] = []
        for (let i = start; reverse ? i >= end : i <= end; reverse ? i -= step : i += step) {
            range.push(i)
        } return range

    }


    createCardParams(show: ResultShow): CardParams {
        const params: CardParams = {
            imageType: "poster",
            direction: "vertical",
            id: show.id,
            mediaType: "show",
            imageSrc: show.posterImageUrl,
            href: ["/", this.routingService.stubs.SHOW, `${show.id}`],
            aspectRatio: { numerator: 2, denominator: 3 }

        }

        return params
    }


    paginate() {
        this.appEventService.emitEvent({ type: "PAGINATION", data: {} })
    }
}
