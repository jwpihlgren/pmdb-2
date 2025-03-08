import { Image } from "../interfaces/image"
import TmdbImage from "../interfaces/tmdb/tmdb-image"

export class TmdbImages implements Image {
    aspectRatio: number
    filePath: string
    height: number
    iso6391?: string | undefined
    voteAverage: number
    voteCount: number
    width: number

    constructor(image: TmdbImage) {
        this.aspectRatio = image.aspect_ratio
        this.filePath = image.file_path
        this.height = image.height
        this.iso6391 = image.iso_639_1
        this.voteAverage = image.vote_average
        this.voteCount = image.vote_count
        this.width = image.width
    }

}



