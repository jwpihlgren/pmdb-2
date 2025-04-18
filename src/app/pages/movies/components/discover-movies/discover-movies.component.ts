import { Component, inject, Signal, } from '@angular/core';
import { DiscoverMoviesService } from '../../../../shared/services/discover-movies.service';
import { ConfigService } from '../../../../shared/services/config.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { CardComponent, CardParams } from '../../../../shared/components/card/card.component';
import { ContentMovieComponent } from '../../../../shared/components/card/components/content-movie/content-movie.component';
import { ListboxComponent } from '../../../../listbox/listbox.component';
import { SearchPeopleService } from '../../../../shared/services/search-people.service';
import { ComboboxComponent } from '../../../../shared/components/combobox/combobox.component';
import { ChipListComponent } from '../../../../shared/components/chip-list/chip-list.component';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';
import { map } from 'rxjs';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Pagination } from '../../../../shared/models/interfaces/pagination';
import { DiscoverMovieFormValue } from '../../../../shared/models/interfaces/discover-movie-form-value';
import { ResultMovie } from '../../../../shared/models/interfaces/result-movie';
import { RoutingService } from '../../../../shared/services/routing.service';
import { CardLoadingComponent } from '../../../../shared/components/card-loading/card-loading.component';

@Component({
    selector: 'app-discover-movies',
    imports: [ReactiveFormsModule, CardGridComponent, CardComponent, ContentMovieComponent, ListboxComponent, ComboboxComponent, ChipListComponent, ChipComponent, PaginationComponent, CardLoadingComponent],
    templateUrl: './discover-movies.component.html',
    styleUrl: './discover-movies.component.css'
})
export class DiscoverMoviesComponent {

    protected formBuilder = inject(FormBuilder)
    protected discoverService: DiscoverMoviesService = inject(DiscoverMoviesService)
    protected configService: ConfigService = inject(ConfigService)
    protected peopleSearchSevice: SearchPeopleService = inject(SearchPeopleService)
    protected routingService: RoutingService = inject(RoutingService)
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
        releaseDate: this.formBuilder.group({
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
    releaseDateSignal: Signal<{ lte: number | string, gte: number | string }>

    constructor() {
        this.genres = this.configService.movieGenres
        this.listboxParams = { list: this.genres.map(g => { return { name: g.name, value: g.id } }) }
        this.voteAverageSignal = toSignal(this.voteAverage.valueChanges.pipe(
            map(data => {
                return { lte: data.lte[0] || "", gte: data.gte[0] || "" }
            })
        ), { initialValue: { lte: "", gte: "" } })

        this.releaseDateSignal = toSignal(this.releaseDate.valueChanges.pipe(
            map(data => {
                return { lte: data.lte[0], gte: data.gte[0] }
            })
        ), { initialValue: { lte: "", gte: "" } })
    }

    get selectedGenres() {
        return this.discoverForm.get('genres') as FormControl
    }

    get voteAverage() {
        return this.discoverForm.get('voteAverage') as FormGroup
    }

    get releaseDate() {
        return this.discoverForm.get('releaseDate') as FormGroup
    }

    onSubmit(): void {
        const formValue: DiscoverMovieFormValue = this.discoverForm.getRawValue()
        this.discoverService.discover(formValue)
    }

    handlePageRequest(page: number) {
        const formValue: DiscoverMovieFormValue = this.discoverForm.getRawValue()
        this.discoverService.discover(formValue, page)
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

    createCardParams(movie: ResultMovie): CardParams {
        const params: CardParams = {
            imageType: "poster",
            direction: "vertical",
            id: movie.id,
            mediaType: "movie",
            imageSrc: movie.posterImagePath,
            href: ["/", this.routingService.stubs.MOVIE, `${movie.id}`],
            aspectRatio: { numerator: 2, denominator: 3 }

        }

        return params
    }

}
