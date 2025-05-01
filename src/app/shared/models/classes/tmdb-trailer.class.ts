import TmdbVideosResponse from "../interfaces/tmdb/tmdb-videos-response";
import Trailer from "../interfaces/trailer";

export default class TmdbTrailer implements Trailer {
    name: string;
    iso6391: string;
    iso31661: string;
    id: string;
    key: string;
    site: string;
    type: string;
    publishedAt: string;
    official: boolean;
    size: number;

    constructor(tmdbTrailer: TmdbVideosResponse["results"][0]) {
        this.name = tmdbTrailer.name
        this.publishedAt = tmdbTrailer.published_at
        this.iso6391 = tmdbTrailer.iso_639_1
        this.iso31661 = tmdbTrailer.iso_3166_1
        this.type = tmdbTrailer.type
        this.site = tmdbTrailer.site.toLowerCase()
        this.id = tmdbTrailer.id
        this.key = tmdbTrailer.key
        this.official = tmdbTrailer.official
        this.size = tmdbTrailer.size
    }
}
