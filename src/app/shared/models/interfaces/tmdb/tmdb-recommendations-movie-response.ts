import TmdbResponseWrapper from "./tmdb-response-wrapper";
import { TmdbResultMovieResponse } from "./tmdb-result-movie-response";

export default interface TmdbRecommendationsMovieResponse extends TmdbResponseWrapper {
    results: TmdbResultMovieResponse["results"]
}
