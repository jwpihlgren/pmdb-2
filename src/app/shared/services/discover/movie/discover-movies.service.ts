import { inject, Injectable } from '@angular/core';
import { map, Observable, } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DiscoverMovieFilterDefinitions } from './discover-movie-filter-definitions.service';
import { FilterFormAdapter } from '../../../adapters/filterForm/filterForm.adapter';
import { TmdbDiscoverMovieAdapter } from '../../../adapters/tmdb/tmdb-discover-movie-filter.adapter';
import { TmdbPagination } from '../../../models/classes/tmdb-pagination';
import { TmdbResultMovie } from '../../../models/classes/tmdb-result-movie';
import { FilterDefinitions } from '../../../models/filter.model';
import { DiscoverMovieFilters, discoverMovieFilters } from '../../../models/interfaces/discover-movie-filters';
import { ResultMovie } from '../../../models/interfaces/result-movie';
import { TmdbResultMovieResponse } from '../../../models/interfaces/tmdb/tmdb-result-movie-response';
import { DiscoverBaseService } from '../discover-base.class';
import { DiscoverResult } from '../discover.types';

export type DiscoverMovieResult = DiscoverResult<ResultMovie>

@Injectable({
    providedIn: 'root'
})
export class DiscoverMoviesService extends DiscoverBaseService<DiscoverMovieFilters, ResultMovie> {
    protected readonly defintions: FilterDefinitions<DiscoverMovieFilters> = inject(DiscoverMovieFilterDefinitions)
    protected filterFormAdapter = new FilterFormAdapter<DiscoverMovieFilters>(this.defintions)
    protected requestUrl = "discover/movie"
    protected http = inject(HttpClient)
    protected requestStrategy = {
        endpoint: "discover/movie",
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

    constructor() {
        super(discoverMovieFilters, new TmdbDiscoverMovieAdapter)
    }

}


