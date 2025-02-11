import { inject, Injectable } from '@angular/core';
import MovieQueryBuilder from '../models/classes/movie-query-builder.class';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Pagination } from '../models/interfaces/pagination';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { TrendingMovie } from '../models/interfaces/trending-movie';
import { HttpClient } from '@angular/common/http';

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

    movieQueryBuilder: MovieQueryBuilder = new MovieQueryBuilder()

    constructor() { }

    discover(): string {
        this.movieQueryBuilder
            .includeVideo(true)
            .voteAverageGte(2)
            .voteAverageLte(8)

        console.log(this.movieQueryBuilder.getQuery())
        return this.movieQueryBuilder.getQuery()
    }

    request(): Observable<any> {
        const endpoint = `discover/movie`
        let queryParams = this.discover()
        queryParams = queryParams + `&api_key=${this.apikey}`
        const url = `${this.api}${endpoint}${queryParams}`
        const options = {}

        return this.http.get<any>(url, options).pipe(
            tap(data => {
                console.log(data)
            }),
        )
    }



}
