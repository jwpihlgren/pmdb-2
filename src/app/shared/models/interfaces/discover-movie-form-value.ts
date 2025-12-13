export interface DiscoverMovieFormValue {
    genres: string[]
    include: { adult: boolean, video: boolean }
    releaseDate: { lte: string | undefined, gte: string | undefined }
    voteAverage: { lte: string | undefined, gte: string | undefined }
    withKeywords: { keywords: string[], pipe: "and" | "or" }
}
