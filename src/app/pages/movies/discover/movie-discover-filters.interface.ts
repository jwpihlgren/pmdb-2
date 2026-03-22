export interface MovieDiscoverFilters {
    genresAll: number[],
    genresAny: number[],
    keywordsAll: number[]
    keywordsAny: number[]
    releaseDateLte: Date | null
    releaseDateGte: Date | null
    voteAverageLte: number | null
    voteAverageGte: number | null
    includeAdult: boolean
    includeVideo: boolean
    sortOrder: MovieSortOrder | null
}


export type MovieSortOrder =
    | 'popularity.asc'
    | 'popularity.desc'
    | 'release_date.asc'
    | 'release_date.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc'

export const MOVIE_SORT_OPTIONS: readonly MovieSortOrder[] = [
    'popularity.asc',
    'popularity.desc',
    'release_date.asc',
    'release_date.desc',
    'vote_average.asc',
    'vote_average.desc',
    'vote_count.asc',
    'vote_count.desc',
]

