import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import DetailedPeople from '../models/interfaces/detailed-people';
import { map, Observable } from 'rxjs';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';
import { environment } from '../../../environments/environment.development';
import TmdbDetailedPeopleResponse from '../models/interfaces/tmdb/tmdb-detailed-people-response';
import TmdbDetailedPeople from '../models/classes/tmdb-detailed-people.class';

@Injectable({
    providedIn: 'root'
})
export class DetailedPeopleService {

    protected http = inject(HttpClient)
    protected queryBuilder = inject(SearchQueryBuilder)

    get(id: number): Observable<DetailedPeople> {
        return this.request(id)
    }

    private request(id: number): Observable<DetailedPeople> {
        const endpoint = `person/${id}`
        this.queryBuilder.apiKey(environment.tmdbApiKey)
        this.queryBuilder.appendToResponse(["images", "movie_credits", "tv_credits"])
        const queryParams = this.queryBuilder.getQuery()
        const url = `${environment.tmdbApiUrl}${endpoint}${queryParams}`
        const options = {}
        console.log(url)
        return this.http.get<TmdbDetailedPeopleResponse>(url, options).pipe(
            map(data => {
                console.log(data)
                return new TmdbDetailedPeople(data)
            })
        )
    }
}
