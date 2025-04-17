import { ImageService } from "../../services/image.service";
import { DetailedMovie } from "../interfaces/detailed-movie";
import DetailedMovieCredits from "../interfaces/detailed-movie-credits";
import { Image } from "../interfaces/image";
import Keyword from "../interfaces/keywords";
import Recommendations from "../interfaces/recommendations";
import { ResultMovie } from "../interfaces/result-movie";
import TmdbDetailedMovieCreditResponse from "../interfaces/tmdb/tmdb-detailed-movie-credit-response";
import TmdbDetailedMovieRecommendationResponse from "../interfaces/tmdb/tmdb-detailed-movie-recommendation-response";
import { TmdbDetailedMovieResponse } from "../interfaces/tmdb/tmdb-detailed-movie-response";
import Trailer from "../interfaces/trailer";
import Gender from "../types/gender";
import { TmdbResultMovie } from "./tmdb-result-movie";
import TmdbTrailer from "./tmdb-trailer.class";
import TmdbGenderFactory from "./tmdbGenderFactory.class";
import { TmdbImages } from "./tmdbImages.class";
import { TmdbKeywordsFactory } from "./tmdbKeywordsFactory.class";

export class TmdbDetailedMovie implements DetailedMovie {
    backdropImagePath: string;
    credits: DetailedMovieCredits
    genres: { id: number; name: string; }[];
    hasVideo: boolean
    id: number;
    images: { backdrops: Image[]; posters: Image[]; logos: Image[]; };
    imdbId: string
    keywords: Keyword[];
    originalLanguage: string;
    originalTitle: string
    overview: string
    popularity: number
    posterImagePath: string
    productionCompanies: { id: number, logoPath: string, name: string, originCountry: string }[];
    productionCountries: { iso31661: string, name: string }[];
    recommendations: Recommendations
    releaseDate: string
    runtime: number
    spokenLanguages: { englishName: string; iso6391: string; name: string; }[];
    status: string
    tagline: string
    title: string
    trailers: Trailer[]
    voteAverage: number
    voteCount: number

    constructor(details: TmdbDetailedMovieResponse) {
        this.backdropImagePath = details.backdrop_path 
        this.credits = this.mapCredits(details.credits)
        this.genres = details.genres
        this.hasVideo = details.video
        this.id = details.id
        this.images = this.mapImages(details.images)
        this.imdbId = details.imdb_id
        this.keywords = TmdbKeywordsFactory.create(details.keywords)
        this.originalLanguage = details.original_language
        this.originalTitle = details.original_title
        this.overview = details.overview
        this.popularity = details.popularity
        this.posterImagePath = details.poster_path
        this.productionCompanies = this.mapCompanies(details.production_companies)
        this.productionCountries = this.mapCountries(details.production_countries)
        this.recommendations = this.mapRecommendations(details.recommendations)
        this.releaseDate = details.release_date
        this.runtime = details.runtime
        this.spokenLanguages = this.mapLanguages(details.spoken_languages)
        this.status = details.status
        this.tagline = details.tagline
        this.title = details.title
        this.trailers = this.mapTrailers(details.videos)
        this.voteAverage = details.vote_average
        this.voteCount = details.vote_count
    }

    private mapRecommendations(raw: TmdbDetailedMovieResponse["recommendations"]): DetailedMovie["recommendations"] {
        return new TmdbRecommendations(raw)
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

    private mapImages(raw: TmdbDetailedMovieResponse["images"]): DetailedMovie["images"] {
        return {
            posters: raw.posters.map(image => new TmdbImages(image)),
            logos: raw.logos.map(image => new TmdbImages(image)),
            backdrops: raw.backdrops.map(image => new TmdbImages(image)),
        }
    }

    private mapCredits(raw: TmdbDetailedMovieResponse["credits"]): DetailedMovie["credits"] {
        return new TmdbDetailedMovieCredits(raw)
    }

    private mapTrailers(raw: TmdbDetailedMovieResponse["videos"]): DetailedMovie["trailers"] {
        return raw.results.map(result => new TmdbTrailer(result))
    }
}


class TmdbRecommendations implements Recommendations {
    page: number
    pageCount: number
    resultCount: number
    results: ResultMovie[]

    constructor(tmdbRecommendation: TmdbDetailedMovieRecommendationResponse) {
        this.page = tmdbRecommendation.page
        this.pageCount = tmdbRecommendation.total_pages
        this.resultCount = tmdbRecommendation.total_results
        this.results = this.mapRecommendations(tmdbRecommendation.results)
    }

    private mapRecommendations(raw: TmdbDetailedMovieRecommendationResponse["results"]): Recommendations["results"] {
        return raw.map(recommendation => new TmdbResultMovie(recommendation))
    }
}

class TmdbDetailedMovieCredits implements DetailedMovieCredits {

    crew: {
        adult: boolean;
        creditId: string;
        department: string;
        gender: Gender;
        id: number;
        job: string;
        knowForDepartment: string;
        name: string;
        originalName: string;
        popularity: number;
        profilePath: string;
    }[];
    cast: {
        adult: boolean;
        castId: number;
        character: string;
        creditId: string;
        gender: Gender;
        id: number;
        knowForDepartment: string;
        name: string;
        order: number;
        originalName: string;
        popularity: number;
        profilePath: string;
    }[];

    constructor(tmdbCredits: TmdbDetailedMovieCreditResponse) {
        this.crew = this.mapCrew(tmdbCredits.crew)
        this.cast = this.mapCast(tmdbCredits.cast)
    }

    mapCrew(crew: TmdbDetailedMovieCreditResponse["crew"]): DetailedMovieCredits["crew"] {
        const parsed: DetailedMovieCredits["crew"] = crew.map(c => {
            return {
                profilePath: c.profile_path,
                adult: c.adult,
                creditId: c.credit_id,
                id: c.id,
                name: c.name,
                department: c.department,
                gender: TmdbGenderFactory.create(c.gender),
                job: c.job,
                knowForDepartment: c.known_for_department,
                originalName: c.original_name,
                popularity: c.popularity
            }
        })
        return parsed
    }
    mapCast(cast: TmdbDetailedMovieCreditResponse["cast"]): DetailedMovieCredits["cast"] {
        const parsed: DetailedMovieCredits["cast"] = cast.map(c => {
            return {
                adult: c.adult,
                castId: c.cast_id,
                character: c.character,
                creditId: c.credit_id,
                gender: TmdbGenderFactory.create(c.gender),
                id: c.id,
                knowForDepartment: c.known_for_department,
                name: c.name,
                order: c.order,
                originalName: c.original_name,
                popularity: c.popularity,
                profilePath: c.profile_path,
            }
        })
        return parsed
    }
}

