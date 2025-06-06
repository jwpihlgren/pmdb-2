import Gender from "../types/gender"
import { CustomPageTitle } from "./custom-page-title"
import Keyword from "./keywords"

export interface DetailedShow extends CustomPageTitle {
    adult: boolean
    backdropImageUrl: string
    createdBy: {
        id: number
        creditId: string
        name: string
        gender: number
        profilePath: string
    }[]
    customPageTitle: string
    credits: DetailedShowCredits
    episodeRunTime: number[]
    firstAirDate: string | undefined
    genres: {
        id: number
        name: string
    }[]
    homepage: string
    id: number
    imdbId: string
    inProduction: boolean
    keywords: Keyword[]
    languages: string[]
    lastAirDate: string | undefined
    lastEpisodeToAir: {
        id: number
        name: string
        overview: string
        voteAverage: number
        voteCount: number
        airDate: string
        episodeNumber: number
        productionCode: string
        runtime: number
        seasonNumber: number
        showId: number
        stillPath: string
    } | undefined
    name: string
    nextEpisodeToAir: string | undefined
    networks: {
        id: number
        logoImagePath: string
        name: string
        originCountry: string
    }[]
    numberOfEpisodes: number
    numberOfSeasons: number
    originCountry: string[]
    originalLanguage: string
    originalName: string
    overview: string
    popularity: number
    posterPath: string
    productionCompanies: {
        id: number
        logoImagePath: string
        name: string
        originCountry: string
    }[]
    productionCountries: {
        iso31661: string
        name: string
    }[],
    recommendations: DetailedShowRecommendation[]
    seasons: {
        airDate: string
        episodeCount: number
        id: number
        name: string
        overview: string
        posterImagePath: string
        seasonNumber: number
        voteAverage: number
        special: boolean
    }[]
    spokenLanguages: {
        englishName: string
        iso6391: string
        name: string
    }[]
    status: string
    tagline: string
    type: string
    voteAverage: number
    voteCount: number
}


export interface DetailedShowCredits {
    cast: {
        adult: boolean
        gender: Gender
        id: number
        knownForDepartment: string
        name: string
        originalName: string
        popularity: number
        profilePath: string
        character: string
        creditId: string
        order: number
    }[]
    crew: {
        adult: boolean
        gender: Gender
        id: number
        knownForDepartment: string
        name: string
        originalName: string
        popularity: number
        profilePath: string
        creditId: string
        department: string
        job: string
    }[]
}

export interface DetailedShowRecommendation {
    adult: boolean
    backdropPath: string
    id: number
    name: string
    originalLanguage: string
    originalName: string
    overview: string
    posterPath: string
    mediaType: string
    genreIds: number[]
    popularity: number
    firstAirDate: string | undefined
    voteAverage: number
    voteCount: number
    originCountry: string[]
}
