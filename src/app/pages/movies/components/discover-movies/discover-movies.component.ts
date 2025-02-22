import { Component, computed, inject, signal, Signal, } from '@angular/core';
import { DiscoverMoviesService } from '../../../../shared/services/discover-movies.service';
import { ConfigService } from '../../../../shared/services/config.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { MovieDiscoverFormValue } from '../../../../shared/models/interfaces/movie-discover-form-value';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ContentMovieComponent } from '../../../../shared/components/card/components/content-movie/content-movie.component';
import { ListboxComponent } from '../../../../listbox/listbox.component';
import { PeopleSearchService } from '../../../../shared/services/people-search.service';
import { ComboboxComponent } from '../../../../shared/components/combobox/combobox.component';
import { ChipListComponent } from '../../../../shared/components/chip-list/chip-list.component';
import { map } from 'rxjs';
import { ChipComponent } from '../../../../shared/components/chip-list/components/chip/chip.component';

@Component({
    selector: 'app-discover-movies',
    imports: [ReactiveFormsModule, CardGridComponent, CardComponent, ContentMovieComponent, ListboxComponent, ComboboxComponent, ChipListComponent, ChipComponent],
    templateUrl: './discover-movies.component.html',
    styleUrl: './discover-movies.component.css'
})
export class DiscoverMoviesComponent {

    protected formBuilder = inject(FormBuilder)
    protected discoverService: DiscoverMoviesService = inject(DiscoverMoviesService)
    protected configService: ConfigService = inject(ConfigService)
    protected peopleSearchSevice: PeopleSearchService = inject(PeopleSearchService)
    genres!: Genre[]

    listboxParams!: { list: { name: string, value: string | number }[] }
    years!: number[]
    results = toSignal(this.discoverService.results$)

    discoverForm = this.formBuilder.group({
        voteAverage: this.formBuilder.group({
            lte: this.formBuilder.control<number | null>(null),
            gte: this.formBuilder.control<number | null>(null)
        }),
        releaseDate: this.formBuilder.group({
            lte: this.formBuilder.control<number | null>(null),
            gte: this.formBuilder.control<number | null>(null)
        }),
        include: this.formBuilder.group({
            adult: this.formBuilder.control(false),
            video: this.formBuilder.control(false)
        }),
        genres: this.formBuilder.control<number[] | string[]>([]),
    });

    constructor() {
        this.genres = this.configService.movieGenres
        this.listboxParams = { list: this.genres.map(g => { return { name: g.name, value: g.id } }) }
        this.years = this.generateYears()

        //this.peopleSearchSevice.results$.subscribe(data => console.log(data))
        //this.peopleSearchSevice.search("jason")
    }

    get selectedGenres() {
        return this.discoverForm.get('genres') as FormControl
    } 

    onSubmit(): void {
        const formValue: MovieDiscoverFormValue = this.discoverForm.getRawValue()
        this.discoverService.discover(formValue)
    }

    onRemove(value: string): void {
        const selectedGenres = this.selectedGenres.getRawValue()
        const updatedGenres = selectedGenres.filter((genre: string | number) => genre.toString() !== value.toString())
        this.selectedGenres.setValue(updatedGenres)
    }

    parseGenre(id: string | number): string | undefined {
        return this.genres.find(g => g.id === id)?.name
    }

    generateYears(): number[] {
        const minYear = 1900
        const maxYear = (new Date()).getFullYear()

        const years: number[] = []

        for (let i = maxYear; i >= minYear; i--) {
            years.push(i)
        }

        return years
    }

}
