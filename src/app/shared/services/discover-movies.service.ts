import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Pagination } from '../models/interfaces/pagination';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { TrendingMovie } from '../models/interfaces/trending-movie';
import { HttpClient } from '@angular/common/http';
import MovieDiscoverQueryBuilder from '../models/classes/movie-discover-query-builder.class';

@Injectable({
    providedIn: 'root'
})
export class DiscoverMoviesService {

    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey
    private pageSubject$: BehaviorSubject<number> = new BehaviorSubject(1)
    private trendingMovies$!: Observable<TrendingMovie[]>
    private paginationResults$: BehaviorSubject<Pagination> = new BehaviorSubject(new PlaceholderPagination())

    protected http = inject(HttpClient)

    movieQueryBuilder: MovieDiscoverQueryBuilder = new MovieDiscoverQueryBuilder()

    constructor() { }

    discover(): string {
        this.movieQueryBuilder
            .includeVideo(true)
            .voteAverageGte(2)
            .voteAverageLte(8)
            .releaseDateGte(new Date(1900, 2, 0))


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
