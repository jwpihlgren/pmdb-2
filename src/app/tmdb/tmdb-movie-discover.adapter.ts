import { Params } from "@angular/router"
import { DiscoverMovieAdapter } from "@app/pages/movies/discover/movie-discover-adapter.interface"
import { MovieDiscoverQuery } from "@app/pages/movies/discover/movie-discover-query"
import { TmdbResultMovie } from "@app/shared/models/classes/tmdb-result-movie"
import { ResultMovie } from "@app/shared/models/interfaces/result-movie"
import { TmdbResultMovieResponse } from "@app/shared/models/interfaces/tmdb/tmdb-result-movie-response"
import PaginatedResult from "@app/shared/models/types/paginated-result.type"
import { Observable } from "rxjs"

export class TmdbDiscoverMovieAdapter implements DiscoverMovieAdapter {
    discover(query: MovieDiscoverQuery): Observable<PaginatedResult<ResultMovie>> {
        const params = this.toParams(query)
    }



    private toParams(query: MovieDiscoverQuery): Params {
        const {
            sortOrder,
            genresAll,
            genresAny,
            keywordsAll,
            keywordsAny,
            includeAdult,
            includeVideo,
            releaseDateGte,
            releaseDateLte,
            voteAverageGte,
            voteAverageLte } = query

        const params: Params = {}
        if (sortOrder) params["sort_by"] = sortOrder
        if (genresAll) params["with_genres"] = genresAll.join(",")
        if (genresAny) params["with_genres"] = genresAll.join("|")
        if (keywordsAll) params["with_keywords"] = keywordsAll.join(",")
        if (keywordsAny) params["with_keywords"] = keywordsAny.join("|")
        if (includeAdult) params["include_adult"] = includeAdult
        if (includeVideo) params["include_video"] = includeVideo
        if (releaseDateGte) params["release_date.gte"] = releaseDateGte
        if (releaseDateLte) params["release_date.lte"] = releaseDateLte
        if (voteAverageGte) params["vote_average.gte"] = voteAverageGte
        if (voteAverageLte) params["vote_average.lte"] = voteAverageLte

        return params
    }

    private toMovies(response: TmdbResultMovieResponse): ResultMovie[] {
        return response.results.map(r => new TmdbResultMovie(r))
    }
}

const allowedParams = [
    "with_genres",
    "with_keywords",
    "include_video",
    "include_adult",
    "release_date.gte",
    "release_date.lte",
    "vote_average.gte",
    "vote_average.lte",
    "sort_by"
]


const allowedValues = [
    "original_title.asc",
    "original_title.desc",
    "popularity.asc",
    "popularity.desc",
    "revenue.asc",
    "revenue.desc",
    "primary_release_date.asc",
    "title.asc",
    "title.desc",
    "primary_release_date.desc",
    "vote_average.asc",
    "vote_average.desc",
    "vote_count.asc",
    "vote_count.desc"
]
},
