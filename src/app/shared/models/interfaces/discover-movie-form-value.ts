import { Selectable } from "./selectable"

export interface DiscoverMovieFormValue {
    genres: Selectable[]
    include: { adult: boolean, video: boolean }
    releaseDate: { lte: number | null, gte: number | null }
    voteAverage: { lte: number | null, gte: number | null }
    withKeywords: { keywords: Selectable[], pipe: "and" | "or" }
}
