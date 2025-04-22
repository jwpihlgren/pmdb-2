import { Component, inject, Signal } from '@angular/core';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { AppEventService } from '../../../../shared/services/app-event.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../../../../shared/services/config.service';
import { SearchPeopleService } from '../../../../shared/services/search-people.service';
import { RoutingService } from '../../../../shared/services/routing.service';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pagination } from '../../../../shared/models/interfaces/pagination';
import { map } from 'rxjs';
import { DiscoverShowFormValue } from '../../../../shared/models/interfaces/discover-show-form-value';
import { ResultShow } from '../../../../shared/models/interfaces/result-show';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { DiscoverShowService } from '../../../../shared/services/discover-show.service';
import { ListboxComponent } from '../../../../listbox/listbox.component';
import { ComboboxComponent } from '../../../../shared/components/combobox/combobox.component';
import { ChipListComponent } from '../../../../shared/components/chip-list/chip-list.component';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ContentShowComponent } from '../../../../shared/components/card/components/content-show/content-show.component';

@Component({
    selector: 'app-discover-shows',
    imports: [ReactiveFormsModule, CardGridComponent, CardComponent, ContentShowComponent, ListboxComponent, ComboboxComponent, ChipListComponent, ChipComponent, PaginationComponent, CardLoadingComponent],
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
    genres!: Genre[]

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
        voteAverage: this.formBuilder.group({
            lte: this.formBuilder.control<number[]>([]),
            gte: this.formBuilder.control<number[]>([])
        }),
        firstAirDate: this.formBuilder.group({
            lte: this.formBuilder.control<number[]>([]),
            gte: this.formBuilder.control<number[]>([])
        }),
        include: this.formBuilder.group({
            adult: this.formBuilder.control(false),
            video: this.formBuilder.control(false)
        }),
        genres: this.formBuilder.control<number[] | string[]>([]),
    });

    voteAverageSignal: Signal<{ lte: number | string, gte: number | string }>
    firstAirDateSignal: Signal<{ lte: number | string, gte: number | string }>

    constructor() {
        this.genres = this.configService.showGenres
        this.listboxParams = { list: this.genres.map(g => { return { name: g.name, value: g.id } }) }
        this.voteAverageSignal = toSignal(this.voteAverage.valueChanges.pipe(
            map(data => {
                return { lte: data.lte[0] || "", gte: data.gte[0] || "" }
            })
        ), { initialValue: { lte: "", gte: "" } })

        this.firstAirDateSignal = toSignal(this.firstAirDate.valueChanges.pipe(
            map(data => {
                return { lte: data.lte[0], gte: data.gte[0] }
            })
        ), { initialValue: { lte: "", gte: "" } })
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

    onSubmit(): void {
        const formValue: DiscoverShowFormValue = this.discoverForm.getRawValue()
        this.discoverService.discover(formValue)
    }

    handlePageRequest(page: number) {
        const formValue: DiscoverShowFormValue = this.discoverForm.getRawValue()
        this.discoverService.discover(formValue, page)
        this.appEventService.emitEvent({ type: "PAGINATION", data: undefined })
    }

    onRemove(value: string): void {
        const selectedGenres = this.selectedGenres.getRawValue()
        const updatedGenres = selectedGenres.filter((genre: string | number) => genre.toString() !== value.toString())
        this.selectedGenres.setValue(updatedGenres)
    }

    parseGenre(id: string | number): string | undefined {
        return this.genres.find(g => g.id === id)?.name
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
            mediaType: "movie",
            imageSrc: show.posterImageUrl,
            href: ["/", this.routingService.stubs.MOVIE, `${show.id}`],
            aspectRatio: { numerator: 2, denominator: 3 }

        }

        return params
    }


    paginate() {
        this.appEventService.emitEvent({ type: "PAGINATION", data: {} })
    }
}
