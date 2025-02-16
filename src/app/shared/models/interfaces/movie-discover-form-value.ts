export interface MovieDiscoverFormValue {
    genres: {[x: string]: boolean}
    include: {adult: boolean, video: boolean}
    releaseDate: {lte: Date | null, gte: Date | null}
    voteAverage: {lte: number | undefined, gte: number | undefined}
}
