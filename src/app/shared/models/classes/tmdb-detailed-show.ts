import { DetailedShow } from "../interfaces/detailed-show";
import { TmdbShowDetails } from "../interfaces/tmdb/tmdb-show-details";

export class TmdbDetailedShow implements DetailedShow {
    adult: boolean
    backdropImageUrl: string
    createdBy: {
        id: number
        creditId: string
        name: string
        gender: number
        profilePath: string
    }[]
    episodeRunTime: number[]
    firstAirDate: string
    genres: {
        id: number
        name: string
    }[]
    homepage: string
    id: number
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
    }[]
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

    constructor(data: TmdbShowDetails) {
        this.adult = data.adult
        this.backdropImageUrl = data.backdrop_path
        this.createdBy = this.mapCreatedBy(data.created_by)
        this.episodeRunTime = data.episode_run_time
        this.firstAirDate = data.first_air_date
        this.genres = this.mapGenres(data.genres)
        this.homepage = data.homepage
        this.id = data.id
        this.inProduction = data.in_production
        this.languages = data.languages
        this.lastAirDate = data.last_air_date
        this.lastEpisodeToAir = this.mapLastEpisode(data.last_episode_to_air)
        this.name = data.name
        this.nextEpisodeToAir = data.next_episode_to_air
        this.networks = this.mapNetworks(data.networks)
        this.numberOfEpisodes = data.number_of_episodes
        this.numberOfSeasons = data.number_of_episodes
        this.originCountry = data.origin_country
        this.originalLanguage = data.original_language
        this.originalName = data.original_name
        this.overview = data.overview
        this.popularity = data.popularity
        this.posterPath = data.poster_path
        this.productionCompanies = this.mapProductionCompanies(data.production_companies)
        this.productionCountries = this.mapProductionCountries(data.production_countries)
        this.seasons = this.mapSeasons(data.seasons)
        this.spokenLanguages = this.mapSpokenLanguages(data.spoken_languages)
        this.status = data.status
        this.tagline = data.tagline
        this.type = data.type
        this.voteAverage = data.vote_average
        this.voteCount = data.vote_count

    }

    mapCreatedBy(data: TmdbShowDetails["created_by"]): DetailedShow["createdBy"] {
        return data.map(datum => {
            return {
                id: datum.id,
                name: datum.name,
                gender: datum.gender,
                creditId: datum.credit_id,
                profilePath: datum.profile_path
            }
        })
    }

    mapGenres(data: TmdbShowDetails["genres"]): DetailedShow["genres"] {
        return data.map(datum => {
            return {
                id: datum.id,
                name: datum.name
            }
        })
    }

    mapLastEpisode(data: TmdbShowDetails["last_episode_to_air"]): DetailedShow["lastEpisodeToAir"] {
        return {
            id: data.id,
            name: data.name,
            showId: data.show_id,
            airDate: data.air_date,
            runtime: data.runtime,
            overview: data.overview,
            stillPath: data.still_path,
            voteCount: data.vote_count,
            voteAverage: data.vote_average,
            seasonNumber: data.season_number,
            episodeNumber: data.episode_number,
            productionCode: data.production_code
        }
    }

    mapNetworks(data: TmdbShowDetails["networks"]): DetailedShow["networks"] {
        return data.map(datum => {
            return {
                id: datum.id,
                name: datum.name,
                logoImagePath: datum.logo_path,
                originCountry: datum.origin_country
            }
        })
    }

    mapProductionCompanies(data: TmdbShowDetails["production_companies"]): DetailedShow["productionCompanies"] {
        return data.map(datum => {
            return {
                originCountry: datum.origin_country,
                logoImagePath: datum.logo_path,
                id: datum.id,
                name: datum.name
            }
        })
    }

    mapProductionCountries(data: TmdbShowDetails["production_countries"]): DetailedShow["productionCountries"] {
        return data.map(datum => {
            return {
                name: datum.name,
                iso31661: datum.iso_3166_1
            }
        })
    }

    mapSeasons(data: TmdbShowDetails["seasons"]): DetailedShow["seasons"] {
        return data.map(datum => {
            return {
                name: datum.name,
                id: datum.id,
                seasonNumber: datum.season_number,
                voteAverage: datum.vote_average,
                overview: datum.overview,
                airDate: datum.air_date,
                episodeCount: datum.episode_count,
                posterImagePath: datum.poster_path
            }
        })
    }

    mapSpokenLanguages(data: TmdbShowDetails["spoken_languages"]): DetailedShow["spokenLanguages"] {
        return data.map(datum => {
            return {
                name: datum.name,
                iso6391: datum.iso_639_1,
                englishName: datum.english_name
            }
        })
    }
}
