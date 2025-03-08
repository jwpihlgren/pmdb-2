import { Gender } from "../types/gender"

export interface ResultPeople {
    adult: boolean
    id: number
    name: string
    originalName: string
    mediaType?: string
    popularity: number
    gender: Gender
    knownForDepartment: string
    profilePath: string
    knownFor: {
        adult: boolean
        backdropImagePath: string
        genreIds: number[]
        id: number
        mediaType: string
        originalLanguage: string
        originalTitle: string
        overview: string
        popularity: number
        posterImagePath: string
        releaseDate: string
        title: string
        video: boolean
        voteAverage: number
        voteCount: number

    }[]
}
