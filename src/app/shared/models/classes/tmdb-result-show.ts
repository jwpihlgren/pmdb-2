import { ImageService } from "../../services/image.service"
import { ResultShow } from "../interfaces/result-show"
import { TmdbResultShowResponse } from "../interfaces/tmdb/tmdb-result-show-response"

export class TmdbResultShow implements ResultShow {
    adult: boolean
    backdropImageUrl: string
    id: number
    name: string
    originalLanguage: string
    originalName: string
    overview: string
    posterImageUrl: string
    mediaType: string
    genreIds: number[]
    popularity: number
    firstairDate: string
    voteAverage: number
    voteCount: number
    originCountries: string[]


    constructor(data: TmdbResultShowResponse["results"][0]) {
        this.adult = data.adult
        this.backdropImageUrl = data.backdrop_path
        this.id = data.id
        this.name = data.name
        this.originalLanguage = data.original_language
        this.originalName = data.original_name
        this.overview = data.overview
        this.posterImageUrl = data.poster_path 
        this.mediaType = data.media_type
        this.genreIds = data.genre_ids
        this.popularity = data.popularity
        this.firstairDate = data.first_air_date
        this.voteAverage = data.vote_average
        this.voteCount = data.vote_count
        this.originCountries = data.origin_country
    }
}
