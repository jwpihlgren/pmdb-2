import TmdbResponseWrapper from "./tmdb-response-wrapper";
import { TmdbResultMovieResponse } from "./tmdb-result-movie-response";
import { TmdbResultShowResponse } from "./tmdb-result-show-response";
import { TmdbResultPeopleResponse } from "./tmdb-search-people-response";

export default interface TmdbResultMultiResponse extends TmdbResponseWrapper {
    results: (TmdbResultShowResponse["results"][0] | TmdbResultMovieResponse["results"][0] | TmdbResultPeopleResponse["results"][0])[]
}


