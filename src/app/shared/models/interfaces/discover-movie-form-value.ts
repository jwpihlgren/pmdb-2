import Keyword from "./keywords"

export interface DiscoverMovieFormValue {
    genres: number[] | string[]
    include: { adult: boolean, video: boolean }
    releaseDate: { lte: number | null, gte: number | null }
    voteAverage: { lte: number | null, gte: number| null }
    withKeywords: { keywords: Keyword[], pipe: "and" | "or" }
}
