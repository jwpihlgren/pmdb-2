import { Component, inject } from '@angular/core';
import { DiscoverMoviesService } from '../../../../shared/services/discover-movies.service';
import { ConfigService } from '../../../../shared/services/config.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Genre } from '../../../../shared/models/interfaces/genre';

@Component({
    selector: 'app-discover-movies',
    imports: [ReactiveFormsModule],
    templateUrl: './discover-movies.component.html',
    styleUrl: './discover-movies.component.css'
})
export class DiscoverMoviesComponent {

    protected formBuilder = inject(FormBuilder)
    protected discoverService: DiscoverMoviesService = inject(DiscoverMoviesService)
    protected configService: ConfigService = inject(ConfigService)
    genres!: Genre[]
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
        this.discoverService.discover()
        this.genres = this.configService.movieGenres
        const res = this.discoverService.request().subscribe()
    }

      onSubmit(): void {
        console.log(this.discoverForm.value)
    }
}
