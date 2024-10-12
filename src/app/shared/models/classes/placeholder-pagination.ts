import { Pagination } from "../interfaces/pagination"

export class PlaceholderPagination implements Pagination {
    page: number
    totalPages: number
    totalResults: number

    constructor() {
        this.page = 1
        this.totalPages = 1
        this.totalResults = 1
    }
}
