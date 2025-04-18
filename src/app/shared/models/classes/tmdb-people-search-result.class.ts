import { ResultPeople } from "../interfaces/search-people-result";
import { TmdbResultPeopleResponse } from "../interfaces/tmdb/tmdb-search-people-response";
import Gender from "../types/gender";
import TmdbGenderFactory from "./tmdbGenderFactory.class";

export default class TMDBResultPeople implements ResultPeople {
    adult: boolean;
    gender: Gender;
    id: number;
    knownForDepartment: string;
    mediaType?: string | undefined;
    name: string;
    originalName: string;
    popularity: number;
    profilePath: string;
    knownFor: {
        adult: boolean;
        backdropImagePath: string;
        genreIds: number[];
        id: number;
        mediaType: string;
        originalLanguage: string;
        originalTitle: string;
        overview: string;
        popularity: number;
        posterImagePath: string;
        releaseDate: string;
        title: string;
        video: boolean;
        voteAverage: number;
        voteCount: number;
    }[];
    constructor(result: TmdbResultPeopleResponse['results'][0]) {
        this.adult = result.adult
        this.gender = TmdbGenderFactory.create(result.gender)
        this.id = result.id
        this.knownFor = this.mapKnownFor(result.known_for)
        this.knownForDepartment = result.known_for_department
        this.name = result.name
        this.originalName = result.original_name
        this.popularity = result.popularity
        this.profilePath = result.profile_path
    }

    mapKnownFor(raw: TmdbResultPeopleResponse["results"][0]["known_for"]): ResultPeople["knownFor"] {
        return raw.map(known => {
            return {
                adult: known.adult,
                popularity: known.popularity,
                backdropImagePath: known.backdrop_path,
                genreIds: known.genre_ids,
                id: known.id,
                mediaType: known.media_type,
                originalLanguage: known.original_language,
                originalTitle: known.original_title,
                overview: known.overview,
                posterImagePath: known.poster_path,
                releaseDate: known.release_date,
                title: known.title,
                video: known.video,
                voteAverage: known.vote_average,
                voteCount: known.vote_count,
            }
        })
    }
}
