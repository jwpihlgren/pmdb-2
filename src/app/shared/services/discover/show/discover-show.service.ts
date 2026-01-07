import { inject, Injectable } from '@angular/core';
import { DiscoverBaseService } from '../discover-base.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FilterFormAdapter } from '../../../adapters/filterForm/filterForm.adapter';
import { TmdbPagination } from '../../../models/classes/tmdb-pagination';
import { FilterDefinitions } from '../../../models/filter.model';
import { ResultShow } from '../../../models/interfaces/result-show';
import { DiscoverResult } from '../discover.types';
import { TmdbResultShow } from '../../../models/classes/tmdb-result-show';
import { TmdbResultShowResponse } from '../../../models/interfaces/tmdb/tmdb-result-show-response';
import { discoverShowFilters, DiscoverShowFilters } from './discover-show-filters.interface';
import { DiscoverShowFilterDefinitionsService } from './discover-show-filter-definitions.service';
import { TmdbDiscoverShowAdapter } from '../../../adapters/tmdb/tmdb-discover-show-filter.adapter';


export type DiscoverShowResult = DiscoverResult<ResultShow>

@Injectable({
    providedIn: 'root'
})
export class DiscoverShowService extends DiscoverBaseService<DiscoverShowFilters, ResultShow> {
    protected readonly defintions: FilterDefinitions<DiscoverShowFilters> = inject(DiscoverShowFilterDefinitionsService)
    protected filterFormAdapter = new FilterFormAdapter<DiscoverShowFilters>(this.defintions)
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
        execute$: (url: URL, params: HttpParams): Observable<DiscoverResult<ResultShow>> => {
            return this.http.get<TmdbResultShowResponse>(url.toString(), { params }).pipe(
                map(data => ({
                    result: data.results.map(d => new TmdbResultShow(d)),
                    pagination: new TmdbPagination(data)
                }))
            );
        }
    }


    constructor() {
        super(discoverShowFilters, new TmdbDiscoverShowAdapter())
    }
}
