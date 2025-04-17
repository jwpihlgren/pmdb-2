import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, switchMap } from 'rxjs';
import SearchQueryBuilderl from '../models/classes/movie-search-query-builder.class';
import { environment } from '../../../environments/environment.development';
import TMDBSearchPeopleResult from '../models/classes/tmdb-people-search-result.class';
import { Pagination } from '../models/interfaces/pagination';
import { PlaceholderPagination } from '../models/classes/placeholder-pagination';
import { TmdbPagination } from '../models/classes/tmdb-pagination';
import { ResultPeople } from '../models/interfaces/search-people-result';
import { TmdbResultPeopleResponse } from '../models/interfaces/tmdb/tmdb-search-people-response';
import QueryBuilder from '../models/classes/query-builder.class';
import SearchQueryBuilder from '../models/classes/movie-search-query-builder.class';

@Injectable({
    providedIn: 'root'
})
export class SearchPeopleService {

    protected http: HttpClient = inject(HttpClient)
    protected query$: Subject<{query: string, page: number}> = new Subject<{query: string, page: number}>
    protected paginationResults$: BehaviorSubject<Pagination> = new BehaviorSubject(new PlaceholderPagination())
    pagination$: Observable<Pagination> = this.paginationResults$.asObservable()
    results$: Observable<ResultPeople[]>

    constructor() {
        this.results$ = this.query$.pipe(
            switchMap(query => {
                return this.request(query)
            })
        )
    }

    search(query: string, page=1): void {
        this.query$.next({query: query, page: page})
    }

    private request(param: {query: string, page: number}): Observable<ResultPeople[]> {
        const queryBuilder = new SearchQueryBuilder(environment.tmdbApiUrl, "search/person")
        queryBuilder.apiKey(environment.tmdbApiKey)
        queryBuilder.searchQuery(param.query)
        queryBuilder.page(param.page)

        return this.http.get<TmdbResultPeopleResponse>(queryBuilder.url).pipe(
            map(data => {
                this.paginationResults$.next(new TmdbPagination(data))
                return data.results
                    .map(result => new TMDBSearchPeopleResult(result))
                    .sort((a, b) => {
                        const [pre, target] = [a.popularity, b.popularity]
                        return pre < target ? 1 : pre > target ? -1 : 0
                    })
            })
        )
    }
}


