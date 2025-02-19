import { inject, Injectable } from '@angular/core';
import SearchQueryBuilderl from '../models/classes/movie-search-query-builder.class';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, debounceTime, map, Observable, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class SearchMoviesService {

    private api = environment.tmdbApiUrl
    private apikey = environment.tmdbApiKey

    protected queryBuilder: SearchQueryBuilderl = inject(SearchQueryBuilderl)
    protected querySubject$: Subject<string> = new Subject()
    searchResults$: Observable<any>

    http: HttpClient = inject(HttpClient)
    constructor() {
        this.searchResults$ = this.querySubject$.pipe(
            switchMap((query: string) => {
                return this.request(query)
            })
        )
    }

    search(query: string, page?: number): any {
        this.querySubject$.next(query)
    }

    private request(query: string): Observable<any> {
        const endpoint = "search/movie"
        this.queryBuilder
            .apiKey(this.apikey)
            .searchQuery(query)
        const queryParams = this.queryBuilder.getQuery()
        const url = `${this.api}${endpoint}${queryParams}`

        return this.http.get<any>(url).pipe(
            debounceTime(200),
            tap(data => console.log(data))
        )
    }
}
