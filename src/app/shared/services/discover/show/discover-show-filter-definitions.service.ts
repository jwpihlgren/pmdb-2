import { Injectable } from '@angular/core';
import { FilterDefinition, filterTypes } from '../../../models/filter.model';
import { DiscoverShowFilters } from './discover-show-filters.interface';

@Injectable({
    providedIn: 'root'
})
export class DiscoverShowFilterDefinitionsService {

    readonly filters = {
        "sortBy": {
            multi: false,
            type: filterTypes.STRING,
            allowedValues: [
                "first_air_date.asc",
                "first_air_date.desc",
                "name.asc",
                "name.desc",
                "original_name.asc",
                "original_name.desc",
                "popularity.asc",
                "popularity.desc",
                "vote_average.asc",
                "vote_average.desc",
                "vote_count.asc",
                "vote_count.desc"
            ]
        },
        "includeAdult": { type: filterTypes.BOOLEAN, multi: false },
        "page": { type: filterTypes.NUMBER, multi: false },
        "firstAirDateGte": { type: filterTypes.DATE, multi: false },
        "firstAirDateLte": { type: filterTypes.DATE, multi: false },
        "voteAverageGte": { type: filterTypes.NUMBER, multi: false },
        "voteAverageLte": { type: filterTypes.NUMBER, multi: false },
        "withGenres": { type: filterTypes.STRING, multi: true },
        "withKeywords": { type: filterTypes.STRING, multi: true },
        "withOriginCountries": { type: filterTypes.STRING, multi: true }
    } as const satisfies Record<keyof DiscoverShowFilters, FilterDefinition>

    readonly definitions = { filters: this.filters } as const

}
