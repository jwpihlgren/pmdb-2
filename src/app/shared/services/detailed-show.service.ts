import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TmdbDetailedShow } from '../models/classes/tmdb-detailed-show';
import { TmdbDetailedShowResponse } from '../models/interfaces/tmdb/tmdb-detailed-show-response';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';
import { DetailedSeason } from '../models/interfaces/detailed-season';
import { TmdbDetailedSeasonResponse } from '../models/interfaces/tmdb/tmdb-detailed-season-response';
import { TmdbDetailedSeason } from '../models/classes/tmdb-detailed-season';

@Injectable({
    providedIn: 'root'
})
export class DetailedShowService {

    constructor(private http: HttpClient) { }

    get(id: string): Observable<TmdbDetailedShow> {
        return this.request(id)
    }

    private request(id: string): Observable<TmdbDetailedShow> {
        const queryBuilder = new SearchQueryBuilder(environment.tmdbApiUrl, `tv/${id}`)
            .apiKey(environment.tmdbApiKey)
            .appendToResponse(["credits", "external_ids", "images", "keywords", "recommendations", "reviews", "similar", "videos"])
        const options = {}

        return this.http.get<TmdbDetailedShowResponse>(queryBuilder.url, options).pipe(
            map(data => new TmdbDetailedShow(data))
        )
    }

    seasonById(showId: number, seasonNumber: number): Observable<DetailedSeason> {
        const queryBuilder = new SearchQueryBuilder(environment.tmdbApiUrl, `tv/${showId}/season/${seasonNumber}`)
            .apiKey(environment.tmdbApiKey)
        const options = {}

        return this.http.get<TmdbDetailedSeasonResponse>(queryBuilder.url, options).pipe(
            map(data => new TmdbDetailedSeason(data))
        )

    }
}
