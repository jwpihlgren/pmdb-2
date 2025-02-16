export interface MovieDiscoverFormValue {
    genres: {[x: string]: boolean}
    include: {adult: boolean, video: boolean}
    releaseDate: {lte: string | undefined, gte: string | undefined}
    voteAverage: {lte: number | undefined, gte: number | undefined}
}
