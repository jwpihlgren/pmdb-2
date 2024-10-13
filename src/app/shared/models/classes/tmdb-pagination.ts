import { Pagination } from "../interfaces/pagination"
import { TmdbResponseWrapper } from "../interfaces/tmdb/tmdb-response-wrapper"

export class TmdbPagination implements Pagination {

    // The tmdb response property total_pages is often 999,
    // but calling 999 gives 400 response saying 500 is max...
    TMDB_MAX_PAGE = 500
    page: number
    totalPages: number
    totalResults: number

    constructor(body: TmdbResponseWrapper) {
        this.page = body.page
        this.totalPages = Math.min(body.total_pages, this.TMDB_MAX_PAGE)
        this.totalResults = body.total_results
    }
}
