import QueryBuilder from "./query-builder.class"

export default class MovieSearchQueryBuilder extends QueryBuilder<MovieSearchQueryBuilder> {

    constructor() {
        super()
    }

    searchQuery = this.paramFactory(this, "query", (value?: string) => {
        if(!value) return ""
        return `${value}`
    })

    page = this.paramFactory(this, "page", (value: number) => {
        if(!value) return ""
        return `${value}`
    })

}
