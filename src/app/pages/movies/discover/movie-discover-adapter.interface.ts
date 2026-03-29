import { Observable } from "rxjs";
import { MovieDiscoverQuery } from "./movie-discover-query";
import PaginatedResult from "@app/shared/models/types/paginated-result.type";
import { ResultMovie } from "@app/shared/models/interfaces/result-movie";

export interface DiscoverMovieAdapter {
    discover(query: MovieDiscoverQuery): Observable<PaginatedResult<ResultMovie>>
}

