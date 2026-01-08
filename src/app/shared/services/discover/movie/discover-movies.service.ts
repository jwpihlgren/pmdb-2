import { inject, Injectable } from '@angular/core';
import { map, Observable, } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DiscoverMovieFilterDefinitions } from './discover-movie-filter-definitions.service';
import { FilterFormAdapter } from '../../../adapters/filterForm/filterForm.adapter';
import { TmdbDiscoverMovieAdapter } from '../../../adapters/tmdb/tmdb-discover-movie-filter.adapter';
import { TmdbPagination } from '../../../models/classes/tmdb-pagination';
import { TmdbResultMovie } from '../../../models/classes/tmdb-result-movie';
import { FilterDefinitions, FilterSet } from '../../../models/filter.model';
import { DiscoverMovieFilters, discoverMovieFilters } from '../../../models/interfaces/discover-movie-filters';
import { ResultMovie } from '../../../models/interfaces/result-movie';
import { TmdbResultMovieResponse } from '../../../models/interfaces/tmdb/tmdb-result-movie-response';
import { DiscoverBaseQueryBuilder, DiscoverBaseService } from '../discover-base.class';
import { DiscoverResult } from '../discover.types';

export type DiscoverMovieResult = DiscoverResult<ResultMovie>

@Injectable({
    providedIn: 'root'
})
export class DiscoverMoviesService extends DiscoverBaseService<DiscoverMovieFilters, ResultMovie> {
    protected readonly definitionsService = inject(DiscoverMovieFilterDefinitions)
    protected readonly definitions = this.definitionsService
    protected filterFormAdapter = new FilterFormAdapter<DiscoverMovieFilters>(this.definitions)
    protected requestUrl = "discover/movie"
    protected http = inject(HttpClient)
    protected endpoint = "discover/movie"
    protected requestStrategy = {
        endpoint: this.endpoint,
        toHttpParams(encoded: Record<string, string | string[]>) {
            let p = new HttpParams();

            for (const [k, v] of Object.entries(encoded)) {
                if (Array.isArray(v)) {
                    for (const item of v) p = p.append(k, item);
                } else {
                    p = p.set(k, v);
                }
            }
            return p;
        },
        execute$: (url: URL, params: HttpParams): Observable<DiscoverResult<ResultMovie>> => {
            return this.http.get<TmdbResultMovieResponse>(url.toString(), { params }).pipe(
                map(data => ({
                    result: data.results.map(d => new TmdbResultMovie(d)),
                    pagination: new TmdbPagination(data)
                }))
            );
        }
    }

    discoverMovieQueryBuilder() {
        const builder = DiscoverMovieQueryBuilder.create(
            ["/", "movies", "discover"],
            this.createFilterSet(this.filterSetKeys),
            this.definitions)
        return builder
    }

    constructor() {
        super(discoverMovieFilters, new TmdbDiscoverMovieAdapter)
    }

}


type MovieFiltersMap = typeof DiscoverMovieFilterDefinitions.prototype.filters;
type MovieDefinitions = typeof DiscoverMovieFilterDefinitions.prototype.definitions;

class DiscoverMovieQueryBuilder extends DiscoverBaseQueryBuilder<
    DiscoverMovieFilters,
    MovieFiltersMap
> {
    static create(
        url: string[],
        newEmptyFilterSet: FilterSet<DiscoverMovieFilters>,
        defsSvc: DiscoverMovieFilterDefinitions
    ) {
        return new DiscoverMovieQueryBuilder(url, newEmptyFilterSet, { filters: defsSvc.filters });
    }

    private constructor(
        url: string[],
        newEmptyFilterSet: FilterSet<DiscoverMovieFilters>,
        defs: MovieDefinitions
    ) {
        super(url, newEmptyFilterSet, defs);
    }
}

