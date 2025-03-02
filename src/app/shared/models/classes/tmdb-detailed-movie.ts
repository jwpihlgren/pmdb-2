import { DetailedMovie } from "../interfaces/detailed-movie";
import { TmdbDetailedMovieResponse } from "../interfaces/tmdb/tmdb-detailed-movie-response";

export class TmdbDetailedMovie implements DetailedMovie {
    id: number;
    title: string
    genres: { id: number; name: string; }[];
    status: string
    runtime: number
    imdbId: string
    hasVideo: boolean
    overview: string
    voteCount: number
    popularity: number
    posterImagePath: string
    releaseDate: string
    voteAverage: number
    originalTitle: string
    spokenLanguages: { englishName: string; iso6391: string; name: string; }[];
    originalLanguage: string;
    backdropImagePath: string;
    productionCompanies: { id: number, logoPath: string, name: string, originCountry: string }[];
    productionCountries: { iso31661: string, name: string}[];
    tagline: string

    constructor(details: TmdbDetailedMovieResponse) {
        this.id = details.id
        this.title = details.title
        this.genres = details.genres
        this.status = details.status
        this.runtime = details.runtime
        this.imdbId = details.imdb_id
        this.hasVideo = details.video
        this.overview = details.overview
        this.voteCount = details.vote_count
        this.popularity = details.popularity
        this.posterImagePath = details.poster_path
        this.releaseDate = details.release_date
        this.voteAverage = details.vote_average
        this.originalTitle = details.original_title
        this.spokenLanguages = this.mapLanguages(details.spoken_languages)
        this.originalLanguage = details.original_language
        this.backdropImagePath = details.backdrop_path
        this.productionCompanies = this.mapCompanies(details.production_companies)
        this.productionCountries = this.mapCountries(details.production_countries)
        this.tagline = details.tagline
    }

    private mapLanguages(raw: TmdbDetailedMovieResponse["spoken_languages"]): DetailedMovie["spokenLanguages"] {
        const result: DetailedMovie["spokenLanguages"] = raw.map(value => {
            return {
                name: value.name,
                englishName: value.english_name,
                iso6391: value.iso_639_1
            }
        })
        return result
    }

    private mapCompanies(raw: TmdbDetailedMovieResponse["production_companies"]): DetailedMovie["productionCompanies"] {
        const result: DetailedMovie["productionCompanies"] = raw.map(value => {
            return {
                name: value.name,
                id: value.id,
                logoPath: value.logo_path,
                originCountry: value.origin_country
            }
        })
        return result
    }

    private mapCountries(raw: TmdbDetailedMovieResponse["production_countries"]): DetailedMovie["productionCountries"] {
        const result: DetailedMovie["productionCountries"] = raw.map(value => {
            return {
                name: value.name,
                iso31661: value.iso_3166_1
            }
        })
        return result
    }



}

