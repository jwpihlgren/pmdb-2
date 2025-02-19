import { PeopleSearchResult } from "../interfaces/people-search-result";
import { TMDBPeopleSearchResponse } from "../interfaces/tmdb/tmdbpeople-search-response";

export default class TMDBPeopleSearchResult implements PeopleSearchResult {
    id: number;
    name: string;
    popularity: number;
    profilePath: string;
    knownFor: { title: string; mediaType: string; id: number; }[];
    constructor(result: TMDBPeopleSearchResponse['results'][0]) {
        this.id = result.id
        this.name = result.name
        this.popularity = result.popularity
        this.profilePath = result.profile_path
        this.knownFor = result.known_for.map(known => {
            return {
                id: known.id,
                mediaType: known.media_type,
                title: known.title
            }
        })
    }
}
