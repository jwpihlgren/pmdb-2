import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { DetailedMovie } from '../models/interfaces/detailed-movie';
import { TmdbDetailedMovie } from '../models/classes/tmdb-detailed-movie';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';
import { TmdbDetailedMovieResponse } from '../models/interfaces/tmdb/tmdb-detailed-movie-response';

@Injectable({
    providedIn: 'root'
})
export class DetailedMovieService {

    protected http = inject(HttpClient)

    get(id: string): Observable<DetailedMovie> {
        return this.request(id)
    }

    private request(id: string): Observable<DetailedMovie> {
        const queryBuilder = new SearchQueryBuilder(environment.tmdbApiUrl, `movie/${id}`)
        queryBuilder
            .apiKey(environment.tmdbApiKey)
            .appendToResponse(["credits", "images", "keywords", "recommendations", "reviews", "similar", "videos"])
        const options = {}

        return this.http.get<TmdbDetailedMovieResponse>(queryBuilder.url, options).pipe(
            map(data => new TmdbDetailedMovie(data)),
        )
    }
}
