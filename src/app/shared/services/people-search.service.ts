import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, Subject, switchMap } from 'rxjs';
import SearchQueryBuilderl from '../models/classes/movie-search-query-builder.class';
import { environment } from '../../../environments/environment.development';
import { TMDBPeopleSearchResponse } from '../models/interfaces/tmdb/tmdbpeople-search-response';
import { PeopleSearchResult } from '../models/interfaces/people-search-result';
import TMDBPeopleSearchResult from '../models/classes/tmdb-people-search-result.class';

@Injectable({
    providedIn: 'root'
})
export class PeopleSearchService {

    protected http: HttpClient = inject(HttpClient)
    protected queryBuilder = inject(SearchQueryBuilderl)
    protected query$: Subject<string> = new Subject<string>

    results$: Observable<PeopleSearchResult[]>

    constructor() {
        this.results$ = this.query$.pipe(
            switchMap(query => {
                return this.request(query)
            })
        )
    }

    search(query: string): void {
        this.query$.next(query)
    }

    private request(query: string, page?: number): Observable<PeopleSearchResult[]> {
        this.queryBuilder.apiKey(environment.tmdbApiKey)
        this.queryBuilder.searchQuery(query)
        if (page) this.queryBuilder.page(page)

        const endpoint = `${environment.tmdbApiUrl}search/person`
        const queryParams = this.queryBuilder.getQuery()
        const url = `${endpoint}${queryParams}`

        return this.http.get<TMDBPeopleSearchResponse>(url).pipe(
            map(data => {
                console.log(data)
                return data.results
                    .map(result => new TMDBPeopleSearchResult(result))
                    .sort((a, b) => {
                        const [pre, target] = [a.popularity, b.popularity]
                        return pre < target ? 1 : pre > target ? -1 : 0
                    })
            })
        )
    }
}


