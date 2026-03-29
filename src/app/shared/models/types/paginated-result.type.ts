import { Pagination } from '@app/shared/models/interfaces/pagination';

type PaginatedResult<T> = {
    pagination: Pagination,
    result: T[]
}

export default PaginatedResult
