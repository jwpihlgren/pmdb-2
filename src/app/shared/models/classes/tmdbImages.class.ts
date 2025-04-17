import { ImageService } from "../../services/image.service"
import AspectRatioFunctions from "../../utils/aspect-ratio.class"
import { Image } from "../interfaces/image"
import TmdbImage from "../interfaces/tmdb/tmdb-image"
import AspectRatio from "../types/aspect-ratio.type"

export class TmdbImages implements Image {
    aspectRatio: AspectRatio
    filePath: string
    height: number
    iso6391?: string | undefined
    voteAverage: number
    voteCount: number
    width: number

    constructor(image: TmdbImage) {
        this.aspectRatio = {
            numerator: AspectRatioFunctions.getNumerator(image.width, image.height),
            denominator: AspectRatioFunctions.getDenominator(image.width, image.height)
        }
        this.filePath = image.file_path
        this.height = image.height
        this.iso6391 = image.iso_639_1
        this.voteAverage = image.vote_average
        this.voteCount = image.vote_count
        this.width = image.width
    }
}
