import { Injectable } from '@angular/core';
import { FilterDefinition, filterTypes } from '../../../models/filter.model';
import { DiscoverMovieFilters } from '../../../models/interfaces/discover-movie-filters';

@Injectable({
    providedIn: 'root'
})
export class DiscoverMovieFilterDefinitions {
    readonly filters = {
        "sortBy": {
            multi: false,
            type: filterTypes.STRING,
            allowedValues: [
                "original_title.asc",
                "original_title.desc",
                "popularity.asc",
                "popularity.desc",
                "revenue.asc",
                "revenue.desc",
                "primary_release_date.asc",
                "title.asc",
                "title.desc",
                "primary_release_date.desc",
                "vote_average.asc",
                "vote_average.desc",
                "vote_count.asc",
                "vote_count.desc"
            ]
        },
        "includeAdult": { type: filterTypes.BOOLEAN, multi: false },
        "includeVideo": { type: filterTypes.BOOLEAN, multi: false },
        "page": { type: filterTypes.NUMBER, multi: false },
        "releaseDateGte": { type: filterTypes.DATE, multi: false },
        "releaseDateLte": { type: filterTypes.DATE, multi: false },
        "voteAverageGte": { type: filterTypes.NUMBER, multi: false },
        "voteAverageLte": { type: filterTypes.NUMBER, multi: false },
        "withGenres": { type: filterTypes.STRING, multi: true },
        "withKeywords": { type: filterTypes.STRING, multi: true }
    } as const satisfies Record<keyof DiscoverMovieFilters, FilterDefinition>

    readonly definitions = { filters: this.filters } as const

}

