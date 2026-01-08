import { inject, Injectable } from '@angular/core';
import { DiscoverBaseQueryBuilder, DiscoverBaseService } from '../discover-base.class';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FilterFormAdapter } from '../../../adapters/filterForm/filterForm.adapter';
import { TmdbPagination } from '../../../models/classes/tmdb-pagination';
import { Filter, FilterDefinitions, FilterSet } from '../../../models/filter.model';
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
    protected definitionsService = inject(DiscoverShowFilterDefinitionsService)
    protected definitions = this.definitionsService
    protected filterFormAdapter = new FilterFormAdapter<DiscoverShowFilters>(this.definitionsService)
    protected http = inject(HttpClient)
    protected requestStrategy = {
        endpoint: "discover/tv",
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
    discoverShowQueryBuilder() {
        const builder = DiscoverShowQueryBuilder.create(
            ["/", "shows", "discover"],
            this.createFilterSet(this.filterSetKeys),
            this.definitionsService)
        return builder
    }



    constructor() {
        super(discoverShowFilters, new TmdbDiscoverShowAdapter())
    }
}


type ShowFiltersMap = typeof DiscoverShowFilterDefinitionsService.prototype.filters;

class DiscoverShowQueryBuilder extends DiscoverBaseQueryBuilder<
    DiscoverShowFilters,
    ShowFiltersMap
> {
    static create(
        url: string[],
        newEmptyFilterSet: FilterSet<DiscoverShowFilters>,
        defsSvc: DiscoverShowFilterDefinitionsService
    ) {
        return new DiscoverShowQueryBuilder(url, newEmptyFilterSet, { filters: defsSvc.filters });
    }

    private constructor(
        url: string[],
        newEmptyFilterSet: FilterSet<DiscoverShowFilters>,
        defs: { filters: ShowFiltersMap }
    ) {
        super(url, newEmptyFilterSet, defs);
    }
}


