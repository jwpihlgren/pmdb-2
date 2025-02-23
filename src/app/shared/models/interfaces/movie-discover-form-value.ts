export interface MovieDiscoverFormValue {
    genres: number[] | string[] | null
    include: {adult: boolean | null, video: boolean | null}
    releaseDate: {lte: number[] | null, gte: number[] | null}
    voteAverage: {lte: number[] | null, gte: number[] | null}
}
