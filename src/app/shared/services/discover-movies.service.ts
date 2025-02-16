import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import MovieDiscoverQueryBuilder from '../models/classes/movie-discover-query-builder.class';
import MovieFilters from '../models/interfaces/movie-filters';

@Injectable({
    providedIn: 'root'
})
export class DiscoverMoviesService {

    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey


    private movieQueryBuilder: MovieFilters = new MovieDiscoverQueryBuilder()
    private query$: BehaviorSubject<any> = new BehaviorSubject({})
    results$: Observable<any>

    protected http = inject(HttpClient)

    constructor() {
        this.results$ = this.query$.pipe(
            switchMap(data => {
                return data
            })
        )
    }

    discover(): string {
        this.movieQueryBuilder
            .includeVideo(true)
            .voteAverageGte(2)
            .voteAverageLte(8)
            .releaseDateGte(new Date(2023, 2, 0))


        console.log(this.movieQueryBuilder.getQuery())
        return this.movieQueryBuilder.getQuery()
    }

    request(): Observable<any> {
        const endpoint = `discover/movie`
        let queryParams = this.discover()
        queryParams = queryParams + `&api_key=${this.apikey}`
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return of({})
        return this.http.get<any>(url, options).pipe(
            tap(data => {
                console.log(data)
            }),
        )
    }



}
