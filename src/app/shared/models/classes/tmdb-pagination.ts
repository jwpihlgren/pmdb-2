import { Pagination } from "../interfaces/pagination"
import { TmdbResponseWrapper } from "../interfaces/tmdb/tmdb-response-wrapper"

export class TmdbPagination implements Pagination {
    page: number
    totalPages: number
    totalResults: number

    constructor(body: TmdbResponseWrapper) {
        this.page = body.page
        this.totalPages = body.total_pages
        this.totalResults = body.total_results
    }
}
