import { DetailedShow, DetailedShowCredits, DetailedShowRecommendation } from "../interfaces/detailed-show";
import Keyword from "../interfaces/keywords";
import { TmdbDetailedShowCreditsResponse, TmdbDetailedShowRecommendationsResponse, TmdbDetailedShowResponse } from "../interfaces/tmdb/tmdb-detailed-show-response";
import TmdbKeywordsResponse from "../interfaces/tmdb/tmdb-keywords-response";
import Gender from "../types/gender";
import TmdbGenderFactory from "./tmdbGenderFactory.class";
import { TmdbKeywordsFactory } from "./tmdbKeywordsFactory.class";

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
    credits: DetailedShowCredits
    customPageTitle: string
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
    keywords: Keyword[];
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
    recommendations: DetailedShowRecommendation[];
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

    constructor(data: TmdbDetailedShowResponse) {
        this.adult = data.adult
        this.backdropImageUrl = data.backdrop_path
        this.createdBy = this.mapCreatedBy(data.created_by)
        this.credits = this.mapCredits(data.credits)
        this.customPageTitle = `${data.name} (${data.first_air_date})`
        this.episodeRunTime = data.episode_run_time
        this.firstAirDate = data.first_air_date
        this.genres = this.mapGenres(data.genres)
        this.homepage = data.homepage
        this.id = data.id
        this.imdbId = data.external_ids.imdb_id
        this.inProduction = data.in_production
        this.languages = data.languages
        this.lastAirDate = data.last_air_date
        this.lastEpisodeToAir = this.mapLastEpisode(data.last_episode_to_air)
        this.keywords = this.mapKeywords(data.keywords)
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
        this.recommendations = this.mapRecommendations(data.recommendations)
        this.seasons = this.mapSeasons(data.seasons)
        this.spokenLanguages = this.mapSpokenLanguages(data.spoken_languages)
        this.status = data.status
        this.tagline = data.tagline
        this.type = data.type
        this.voteAverage = data.vote_average
        this.voteCount = data.vote_count

    }

    mapKeywords(data: TmdbKeywordsResponse): Keyword[] {
        return TmdbKeywordsFactory.create(data)
    }

    mapCreatedBy(data: TmdbDetailedShowResponse["created_by"]): TmdbDetailedShow["createdBy"] {
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

    mapGenres(data: TmdbDetailedShowResponse["genres"]): TmdbDetailedShow["genres"] {
        return data.map(datum => {
            return {
                id: datum.id,
                name: datum.name
            }
        })
    }

    mapLastEpisode(data: TmdbDetailedShowResponse["last_episode_to_air"]): TmdbDetailedShow["lastEpisodeToAir"] {
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

    mapNetworks(data: TmdbDetailedShowResponse["networks"]): TmdbDetailedShow["networks"] {
        return data.map(datum => {
            return {
                id: datum.id,
                name: datum.name,
                logoImagePath: datum.logo_path,
                originCountry: datum.origin_country
            }
        })
    }

    mapProductionCompanies(data: TmdbDetailedShowResponse["production_companies"]): TmdbDetailedShow["productionCompanies"] {
        return data.map(datum => {
            return {
                originCountry: datum.origin_country,
                logoImagePath: datum.logo_path,
                id: datum.id,
                name: datum.name
            }
        })
    }

    mapProductionCountries(data: TmdbDetailedShowResponse["production_countries"]): TmdbDetailedShow["productionCountries"] {
        return data.map(datum => {
            return {
                name: datum.name,
                iso31661: datum.iso_3166_1
            }
        })
    }

    mapSeasons(data: TmdbDetailedShowResponse["seasons"]): TmdbDetailedShow["seasons"] {
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

    mapSpokenLanguages(data: TmdbDetailedShowResponse["spoken_languages"]): TmdbDetailedShow["spokenLanguages"] {
        return data.map(datum => {
            return {
                name: datum.name,
                iso6391: datum.iso_639_1,
                englishName: datum.english_name
            }
        })
    }

    private mapCredits(raw: TmdbDetailedShowResponse["credits"]): DetailedShowCredits {
        return new TmdbDetailedShowCredits(raw)
    }

    mapRecommendations(recommendations: TmdbDetailedShowRecommendationsResponse): DetailedShowRecommendation[] {
        return recommendations.results.map(r => {
            return new TmdbRecommendation(r)
        })
    }

}


class TmdbDetailedShowCredits implements DetailedShowCredits {
    cast: { adult: boolean; gender: Gender; id: number; knownForDepartment: string; name: string; originalName: string; popularity: number; profilePath: string; character: string; creditId: string; order: number; }[];

    crew: { adult: boolean; gender: Gender; id: number; knownForDepartment: string; name: string; originalName: string; popularity: number; profilePath: string; creditId: string; department: string; job: string; }[];

    constructor(raw: TmdbDetailedShowCreditsResponse) {
        this.cast = this.mapCast(raw.cast)
        this.crew = this.mapCrew(raw.crew)
    }

    mapCast(cast: TmdbDetailedShowCreditsResponse["cast"]): DetailedShowCredits["cast"] {
        return cast.map(c => {
            return {
                adult: c.adult,
                character: c.character,
                creditId: c.credit_id,
                gender: TmdbGenderFactory.create(c.gender),
                id: c.id,
                knownForDepartment: c.known_for_department,
                name: c.name,
                order: c.order,
                originalName: c.original_name,
                popularity: c.popularity,
                profilePath: c.profile_path
            }
        })

    }
    mapCrew(crew: TmdbDetailedShowCreditsResponse["crew"]): DetailedShowCredits["crew"] {
        return crew.map(c => {
            return {
                adult: c.adult,
                creditId: c.credit_id,
                department: c.department,
                gender: TmdbGenderFactory.create(c.gender),
                id: c.id,
                job: c.job,
                knownForDepartment: c.known_for_department,
                name: c.name,
                originalName: c.original_name,
                popularity: c.popularity,
                profilePath: c.profile_path,
            }
        })
    }

}

class TmdbRecommendation implements DetailedShowRecommendation {
    adult: boolean;
    id: number;
    name: string;
    originalName: string;
    popularity: number;
    firstAirDate: string;
    posterPath: string;
    genreIds: number[];
    overview: string;
    mediaType: string;
    voteCount: number;
    voteAverage: number;
    backdropPath: string;
    originCountry: string[];
    originalLanguage: string;

    constructor(raw: TmdbDetailedShowRecommendationsResponse["results"][0]) {
        this.adult = raw.adult
        this.id = raw.id
        this.name = raw.name
        this.originalName = raw.original_name
        this.popularity = raw.popularity
        this.firstAirDate = raw.first_air_date
        this.posterPath = raw.poster_path
        this.genreIds = raw.genre_ids
        this.overview = raw.overview
        this.mediaType = raw.media_type
        this.voteCount = raw.vote_count
        this.voteAverage = raw.vote_average
        this.backdropPath = raw.backdrop_path
        this.originCountry = raw.origin_country
        this.originalLanguage = raw.original_language
    }
}
