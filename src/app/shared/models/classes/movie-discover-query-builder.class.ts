import MovieFilters from "../interfaces/movie-filters"
import QueryBuilder from "./query-builder.class"

type Operator = "or" | "and"

export default class MovieDiscoverQueryBuilder extends QueryBuilder<MovieDiscoverQueryBuilder> implements MovieFilters {

    constructor(api: string, endpoint: string) {
        super(api, endpoint)
    }

    includeAdult = this.paramFactory<boolean>(this, "include_adult", (value: boolean) => {
        return `${value}`
    })


    includeVideo = this.paramFactory<boolean>(this, "include_video", (value: boolean) => {
        return `${value}`
    })

    withGenres = this.paramFactory<string[], Operator>(this, "with_genres", (value: string[], options: Operator = "or") => {
        if (value.length === 0) return ""
        const operator = options === "or" ? "," : "|"
        return `${value.join(operator)}`
    })

    withKeywords = this.paramFactory<string[], Operator>(this, "with_keywords", (value: string[], options: Operator = "or") => {
        if (value.length === 0) return ""
        const operator = options === "or" ? "," : "|"
        return `${value.join(operator)}`
    })

    voteAverageLte = this.paramFactory<number>(this, "vote_average.lte", (value: number) => {
        const max = 10
        const min = 0
        if (value > max) return `${max}`
        if (value < min) return `${min}`
        return `${value}`

    })

    voteAverageGte = this.paramFactory<number>(this, "vote_average.gte", (value: number) => {
        const min = 0
        const max = 10
        if (value > max) return `${max}`
        if (value < min) return `${min}`
        return `${value}`
    })

    releaseDateLte = this.paramFactory<[number, number, number]>(this, "release_date.lte", (value: [number, number, number]) => {
        const [year, month, day] = value
        const minYear = 1900
        const maxYear = new Date().getFullYear()

        if (year < minYear || year > maxYear) return ""
        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`

    })

    releaseDateGte = this.paramFactory<[number, number, number]>(this, "release_date.gte", (value: [number, number, number]) => {
        const [year, month, day] = value

        const minYear = 1900
        const maxYear = new Date().getFullYear()

        if (year < minYear || year > maxYear) return ""
        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    })



}


