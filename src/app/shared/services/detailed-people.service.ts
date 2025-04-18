import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import DetailedPeople from '../models/interfaces/detailed-people';
import { map, Observable, tap } from 'rxjs';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';
import { environment } from '../../../environments/environment.development';
import TmdbDetailedPeopleResponse from '../models/interfaces/tmdb/tmdb-detailed-people-response';
import TmdbDetailedPeople from '../models/classes/tmdb-detailed-people.class';

@Injectable({
    providedIn: 'root'
})
export class DetailedPeopleService {

    protected http = inject(HttpClient)

    get(id: number): Observable<DetailedPeople> {
        return this.request(id)
    }

    private request(id: number): Observable<DetailedPeople> {
        const queryBuilder = new SearchQueryBuilder(environment.tmdbApiUrl, `person/${id}`)
        queryBuilder.apiKey(environment.tmdbApiKey)
        queryBuilder.appendToResponse(["images", "movie_credits", "tv_credits"])
        const options = {}
        return this.http.get<TmdbDetailedPeopleResponse>(queryBuilder.url, options).pipe(
            map(data => {
                return new TmdbDetailedPeople(data)
            })
        )
    }
}
