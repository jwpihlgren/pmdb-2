import { Component, computed, inject, Signal } from '@angular/core';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { AppEventService } from '../../../../shared/services/app-event.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../../../../shared/services/config.service';
import { SearchPeopleService } from '../../../../shared/services/search-people.service';
import { RoutingService } from '../../../../shared/services/routing.service';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pagination } from '../../../../shared/models/interfaces/pagination';
import { DiscoverShowFormValue } from '../../../../shared/models/interfaces/discover-show-form-value';
import { ResultShow } from '../../../../shared/models/interfaces/result-show';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { DiscoverShowService } from '../../../../shared/services/discover-show.service';
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

@Component({
    selector: 'app-discover-shows',
    imports: [ReactiveFormsModule, SimpleGridComponent, CardComponent, ContentShowComponent, ComboboxComponent, ChipListComponent, ChipComponent, PaginationComponent, CardLoadingComponent, ComboboxComponent, ComboboxItemComponent, DropdownListComponent, ExpandableMultiSelectComponent, SelectItemComponent, TextInputComponent],
    templateUrl: './discover-shows.component.html',
    styleUrl: './discover-shows.component.css'
})
export class DiscoverShowsComponent {

    protected formBuilder = inject(FormBuilder)
    protected discoverService: DiscoverShowService = inject(DiscoverShowService)
    protected configService: ConfigService = inject(ConfigService)
    protected peopleSearchSevice: SearchPeopleService = inject(SearchPeopleService)
    protected routingService: RoutingService = inject(RoutingService)
    protected appEventService: AppEventService = inject(AppEventService)
    protected keywordService: KeywordService = inject(KeywordService)
    genres!: Genre[]
    cardMaxWidth = "250px"
    listboxParams!: { list: { name: string, value: string | number }[] }
    years: number[] = this.generateNumberRange(new Date().getFullYear(), 1900)
    results = toSignal(this.discoverService.results$)
    pagination: Signal<Pagination> = toSignal(this.discoverService.pagination, { requireSync: true })
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
        voteAverage: this.formBuilder.nonNullable.group({
            lte: this.formBuilder.nonNullable.control<Selectable | undefined>(undefined),
            gte: this.formBuilder.nonNullable.control<Selectable | undefined>(undefined)
        }),
        firstAirDate: this.formBuilder.nonNullable.group({
            lte: this.formBuilder.nonNullable.control<Selectable | undefined>(undefined),
            gte: this.formBuilder.nonNullable.control<Selectable | undefined>(undefined)
        }),
        include: this.formBuilder.nonNullable.group({
            adult: this.formBuilder.nonNullable.control(false),
            video: this.formBuilder.nonNullable.control(false)
        }),
        genres: this.formBuilder.nonNullable.control<Selectable[]>([]),
        withKeywords: this.formBuilder.nonNullable.group({
            keywords: this.formBuilder.nonNullable.control<Selectable[]>([]),
            pipe: this.formBuilder.nonNullable.control<"and" | "or">("and")
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
            this.withKeywords.controls["keywords"].getRawValue()).map((k) => ({ value: k.id.toString(), name: k.name }))
    })

    constructor() {
        this.genres = this.configService.movieGenres
        this.listboxParams = { list: this.genres.map(g => { return { name: g.name, value: g.id } }) }
        this.onSubmit()
    }

    get selectedGenres() {
        return this.discoverForm.get('genres') as FormControl
    }

    get voteAverage() {
        return this.discoverForm.get('voteAverage') as FormGroup
    }

    get firstAirDate() {
        return this.discoverForm.get('firstAirDate') as FormGroup
    }

    get include() {
        return this.discoverForm.get('include') as FormGroup
    }

    get withKeywords() {
        return this.discoverForm.get('withKeywords') as FormGroup

    }

    lookupKeyword(id: string): string {
        return this.keywordService.keywordNameById(id) ?? id
    }

    onSubmit(): void {
        const formValues = this.discoverForm.getRawValue() satisfies DiscoverShowFormValue
        this.discoverService.discover(formValues)
    }

    onKeywordSubmit(): void {
        const formValue = this.keywordForm.controls["keyword"].getRawValue()
        if (!formValue) return
        const previousValues = this.withKeywords.getRawValue().keywords
        this.withKeywords.controls["keywords"].setValue([...previousValues, formValue])
        this.keywordForm.reset()
    }

    onKeywordSelect(keyword: Selectable): void {
        const previousValues = this.withKeywords.getRawValue().keywords
        this.withKeywords.controls["keywords"].setValue([...previousValues, keyword])
        this.keywordForm.reset()
    }

    handlePageRequest(page: number) {
        const values = this.discoverForm.getRawValue() satisfies DiscoverShowFormValue
        this.discoverService.discover(values, page)
        this.appEventService.emitEvent({ type: "PAGINATION", data: undefined })
    }


    onGenreToggle(genre: Genre): void {

        const selectedGenres: Genre[] = this.selectedGenres.getRawValue()
        const existingIndex = selectedGenres.findIndex(g => g.id === genre.id)
        if (existingIndex !== -1) {
            selectedGenres.splice(existingIndex, 1)
            this.selectedGenres.setValue(selectedGenres)
            return
        }
        this.selectedGenres.setValue(Array.from(new Set([...selectedGenres, genre])))
    }

    onGenreRemove(genre: Selectable): void {
        const selectedGenres: Selectable[] = this.selectedGenres.getRawValue()
        const existingIndex = selectedGenres.findIndex(g => g.value === genre.value)
        if (existingIndex !== -1) {
            selectedGenres.splice(existingIndex, 1)
            this.selectedGenres.setValue(selectedGenres)
        }
    }

    onKeywordRemove(index: number): void {
        const previousValues = [...this.withKeywords.getRawValue().keywords]
        previousValues.splice(index, 1)
        this.withKeywords.get("keywords")!.setValue(previousValues)
    }

    generateNumberRange(start: number, end: number, step: number = 1): number[] {

        const reverse: boolean = start > end
        const range: number[] = []
        for (let i = start; reverse ? i >= end : i <= end; reverse ? i -= step : i += step) {
            range.push(i)
        }
        return range
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
