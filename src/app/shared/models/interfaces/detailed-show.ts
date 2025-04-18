import { DetailedShowRecommendationsComponent } from "../../../pages/detailed-show/components/detailed-show-recommendations/detailed-show-recommendations.component"
import Gender from "../types/gender"

export interface DetailedShow {
    adult: boolean
    backdropImageUrl: string
    createdBy: {
        id: number
        creditId: string
        name: string
        gender: number
        profilePath: string
    }[]
    credits: DetailedShowCredits
    episodeRunTime: number[]
    firstAirDate: string
    genres: {
        id: number
        name: string
    }[]
    homepage: string
    id: number
    imdbId: string
    inProduction: boolean
    languages: string[]
    lastAirDate: string
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
    }
    name: string
    nextEpisodeToAir: string | "null"
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
    firstAirDate: string
    voteAverage: number
    voteCount: number
    originCountry: string[]
}
