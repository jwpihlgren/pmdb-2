import Trailer from "../interfaces/trailer"
import TmdbVideosResponse from "../interfaces/tmdb/tmdb-videos-response"
import TmdbTrailer from "./tmdb-trailer.class"

const SUPPORTED_SITES = ["youtube", "vimeo"]

const TYPE_ORDER = ["trailer", "teaser", "clip", "featurette"]

export class TmdbTrailerFactory {
    static create(data: TmdbVideosResponse | undefined): Trailer[] {
        const results = data?.results ?? []
        return results
            .map(result => new TmdbTrailer(result))
            .filter(trailer => SUPPORTED_SITES.includes(trailer.site) && trailer.key !== "")
            .sort((a, b) => TmdbTrailerFactory.rank(a) - TmdbTrailerFactory.rank(b) || b.publishedAt.localeCompare(a.publishedAt))
    }

    private static rank(trailer: Trailer): number {
        const type = TYPE_ORDER.indexOf(trailer.type.toLowerCase())
        const position = type === -1 ? TYPE_ORDER.length : type
        return position * 2 + (trailer.official ? 0 : 1)
    }
}
