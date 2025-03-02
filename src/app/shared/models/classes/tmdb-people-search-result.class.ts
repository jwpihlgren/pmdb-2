import { SearchPeopleResult } from "../interfaces/search-people-result";
import { TmdbSearchPeopleResponse } from "../interfaces/tmdb/tmdb-search-people-response";

export default class TMDBPeopleSearchResult implements SearchPeopleResult{
    id: number;
    name: string;
    popularity: number;
    profilePath: string;
    knownFor: { title: string; mediaType: string; id: number; }[];
    constructor(result: TmdbSearchPeopleResponse['results'][0]) {
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
