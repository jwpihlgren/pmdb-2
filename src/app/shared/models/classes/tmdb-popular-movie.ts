import { PopularMovie } from "../interfaces/popular-movie";
import { TmdbPopularMoviesResponse } from "../interfaces/tmdb/tmdb-popular-movies-response";

export default class TmdbPopularMovie implements PopularMovie {
    adult: boolean
    backdropPath: string
    genreIds: number[]
    id: number
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

    constructor(popularMovie: TmdbPopularMoviesResponse["results"][0]) {
        this.adult = popularMovie.adult
        this.backdropPath = popularMovie.backdrop_path
        this.genreIds = popularMovie.genre_ids
        this.id = popularMovie.id
        this.originalLanguage = popularMovie.original_language
        this.originalTitle = popularMovie.original_title
        this.overview = popularMovie.overview
        this.popularity = popularMovie.popularity
        this.posterImagePath = popularMovie.poster_path
        this.releaseDate = popularMovie.release_date
        this.title = popularMovie.title
        this.video = popularMovie.video
        this.voteAverage = popularMovie.vote_average
        this.voteCount = popularMovie.vote_count
    }
}
