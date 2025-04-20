export interface DiscoverShowFormValue {
    genres: number[] | string[] | null
    include: {adult: boolean | null, video: boolean | null}
    firstAirDate: {lte: number[] | null, gte: number[] | null}
    voteAverage: {lte: number[] | null, gte: number[] | null}
}
