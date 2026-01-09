import { Filter } from "../../../models/filter.model"

export const discoverShowFilters = {
    withGenres: "withGenres",
    withKeywords: "withKeywords",
    withPeople: "withPeople",
    includeVideo: "includeVideo",
    includeAdult: "includeAdult",
    firstAirDateLte: "firstAirDateLte",
    firstAirDateGte: "firstAirDateGte",
    voteAverageLte: "voteAverageLte",
    voteAverageGte: "voteAverageGte",
    sortBy: "sortBy",
    page: "page"

} as const

export type DiscoverShowFilters = {
    [K in keyof typeof discoverShowFilters]: Filter | undefined
}

