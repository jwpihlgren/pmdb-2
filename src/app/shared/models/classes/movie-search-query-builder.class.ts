import QueryBuilder from "./query-builder.class"

export default class SearchQueryBuilder extends QueryBuilder<SearchQueryBuilder> {

    constructor(endpoint: string, api: string) {
        super(endpoint, api)
    }

    searchQuery = this.paramFactory(this, "query", (value?: string) => {
        if(!value) return ""
        return `${value}`
    })

    appendToResponse = this.paramFactory(this, "append_to_response", (value: string[]) => {
        return value.join(",")
    })
}
    
