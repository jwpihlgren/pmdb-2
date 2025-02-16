import { Component, inject } from '@angular/core';
import { DiscoverMoviesService } from '../../../../shared/services/discover-movies.service';
import { ConfigService } from '../../../../shared/services/config.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Genre } from '../../../../shared/models/interfaces/genre';
import { MovieDiscoverFormValue } from '../../../../shared/models/interfaces/movie-discover-form-value';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardGridComponent } from '../../../../shared/components/card-grid/card-grid.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ContentMovieComponent } from '../../../../shared/components/card/components/content-movie/content-movie.component';

@Component({
    selector: 'app-discover-movies',
    imports: [ReactiveFormsModule, CardGridComponent, CardComponent, ContentMovieComponent],
    templateUrl: './discover-movies.component.html',
    styleUrl: './discover-movies.component.css'
})
export class DiscoverMoviesComponent {

    protected formBuilder = inject(FormBuilder)
    protected discoverService: DiscoverMoviesService = inject(DiscoverMoviesService)
    protected configService: ConfigService = inject(ConfigService)
    genres!: Genre[]
    results = toSignal(this.discoverService.results$)
    discoverForm = this.formBuilder.group({
        voteAverage: this.formBuilder.group({
            lte: undefined,
            gte: undefined
        }),
        releaseDate: this.formBuilder.group({
            lte: undefined,
            gte: undefined
        }),
        include: this.formBuilder.group({
            adult: false,
            video: false
        }),
        genres: this.formBuilder.group(this.configService.movieGenres.reduce((acc, genre: Genre) => {
            acc[genre.id] = false
            return acc
        }, {} as {[key: string]: boolean}))
    })

    constructor() {
        this.genres = this.configService.movieGenres
    }

      onSubmit(): void {
        console.log(this.discoverForm.value)
        this.discoverService.discover(this.discoverForm.value as MovieDiscoverFormValue)

    }

}
