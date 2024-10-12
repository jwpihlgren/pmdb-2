export interface TrendingMovie {
    adult: boolean
    backdropImagePath: string
    id: number
    title: string
    orignalLanguage: string
    originalTitle: string
    overview: string
    posterImagePath: string
    mediaType: string
    genreIds: number[]
    popularity: number
    releaseDate: string
    hasVideo: boolean
    voteAverage: number
    voteCount: number
}
