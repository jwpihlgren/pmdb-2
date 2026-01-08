import { Filter } from "../filter.model"

export const discoverMovieFilters = {
    withGenres: "withGenres",
    withKeywords: "withKeywords",
    includeVideo: "includeVideo",
    includeAdult: "includeAdult",
    releaseDateLte: "releaseDateLte",
    releaseDateGte: "releaseDateGte",
    voteAverageLte: "voteAverageLte",
    voteAverageGte: "voteAverageGte",
    sortBy: "sortBy",
    page: "page"

} as const

export type DiscoverMovieFilters = {
    [K in keyof typeof discoverMovieFilters]: Filter | undefined
}

