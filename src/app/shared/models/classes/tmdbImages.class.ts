import Images, { Image } from "../interfaces/images"
import TmdbImageResponse from "../interfaces/tmdb/tmdb-image-response"

export class TmdbImages implements Images {
    posters: Image[]
    backdrops: Image[]
    logos: Image[]
    constructor(images: TmdbImageResponse) {
        this.posters = this.mapImages(images.posters)
        this.backdrops = this.mapImages(images.backdrops)
        this.logos = this.mapImages(images.logos)
    }

    private mapImages(raw: TmdbImageResponse["logos" | "backdrops" | "posters"]): Image[] {
        const images: Image[] = raw.map(r => {
            return {
                aspectRatio: r.aspect_ratio,
                filePath: r.file_path,
                height: r.height,
                voteAverage: r.vote_average,
                voteCount: r.vote_count,
                width: r.width,
                iso6391: r.iso_639_1
            }
        })
        return images
    }
}



