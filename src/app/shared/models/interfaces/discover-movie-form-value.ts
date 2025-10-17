import { Selectable } from "./selectable"

export interface DiscoverMovieFormValue {
    genres: Selectable[]
    include: { adult: boolean, video: boolean }
    releaseDate: { lte: Selectable | undefined, gte: Selectable | undefined }
    voteAverage: { lte: Selectable | undefined, gte: Selectable | undefined }
    withKeywords: { keywords: Selectable[], pipe: "and" | "or" }
}
