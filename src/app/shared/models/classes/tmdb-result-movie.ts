import { ImageService } from "../../services/image.service";
import { ResultMovie } from "../interfaces/result-movie";
import { TmdbResultMovieResponse } from "../interfaces/tmdb/tmdb-result-movie-response";

export class TmdbResultMovie implements ResultMovie {
    adult: boolean
    backdropImagePath: string
    id: number
    title: string
    originalLanguage: string
    originalTitle: string
    overview: string
    posterImagePath: string
    mediaType: string
    genreIds: string[]
    popularity: number
    releaseDate: string
    hasVideo: boolean
    voteAverage: number
    voteCount: number

    constructor(data: TmdbResultMovieResponse["results"][0]) {
        this.adult = data.adult
        this.backdropImagePath = data.backdrop_path
        this.id = data.id
        this.title = data.title
        this.originalLanguage = data.original_language
        this.originalTitle = data.original_title
        this.overview = data.overview
        this.posterImagePath = data.poster_path
        this.mediaType = data.media_type
        this.genreIds = data.genre_ids.map(g => g.toString())
        this.popularity = data.popularity
        this.releaseDate = data.release_date
        this.hasVideo = data.video
        this.voteAverage = data.vote_average
        this.voteCount = data.vote_count
    }
}
