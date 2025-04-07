import TmdbDetailedMovieCreditResponse from "./tmdb-detailed-movie-credit-response"
import TmdbDetailedMovieRecommendationResponse from "./tmdb-detailed-movie-recommendation-response"
import TmdbImage from "./tmdb-image"
import TmdbKeywordsResponse from "./tmdb-keywords-response"
import TmdbVideosResponse from "./tmdb-videos-response"

export interface TmdbDetailedMovieResponse {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: string
    budget: number
    genres: { id: number, name: string }[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: { id: number, logo_path: string, name: string, origin_country: string }[]
    production_countries: { iso_3166_1: string, name: string }[]
    release_date: string
    recommendations: TmdbDetailedMovieRecommendationResponse
    revenue: number
    runtime: number
    spoken_languages: { english_name: string, iso_639_1: string, name: string }[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    images: {
        posters: TmdbImage[],
        logos: TmdbImage[],
        backdrops: TmdbImage[]
    }
    credits: TmdbDetailedMovieCreditResponse
    keywords: TmdbKeywordsResponse
    videos: TmdbVideosResponse
}


