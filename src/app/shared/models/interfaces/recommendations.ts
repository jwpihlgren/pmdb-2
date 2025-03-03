import { ResultMovie } from "./result-movie"

export default interface Recommendations {
    page: number
    pageCount: number
    resultCount: number
    results: ResultMovie[]
}

