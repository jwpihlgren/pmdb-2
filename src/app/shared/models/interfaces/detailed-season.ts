import Gender from "../types/gender"

export interface DetailedSeason {
    _id: string
    airDate: string
    episodes:
    {
        airDate: string
        episodeNumber: number
        id: number
        name: string
        overview: string
        productionCode: string
        runtime: number
        seasonNumber: number
        showId: number
        stillPath: string
        voteAverage: number
        voteCount: number
        crew: {
            department: string
            job: string
            creditId: string
            adult: boolean
            gender: Gender
            id: number
            knownForDepartment: string
            name: string
            originalName: string
            popularity: number
            profilePath: string
        }[]
        guestStars: {
            character: string
            creditId: string
            order: number
            adult: boolean
            gender: Gender
            id: number
            knownForDepartment: string
            name: string
            originalName: string
            popularity: number
            profilePath: string
        }[]
    }[]
    name: string
    overview: string
    id: number
    posterPath: string
    seasonNumber: number
    voteAverage: number

}
