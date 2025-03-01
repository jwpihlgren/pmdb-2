import { Injectable } from "@angular/core"
import QueryBuilder from "./query-builder.class"

@Injectable({
    providedIn: 'root'
})

export default class SearchQueryBuilder extends QueryBuilder<SearchQueryBuilder> {

    constructor() {
        super()
    }

    searchQuery = this.paramFactory(this, "query", (value?: string) => {
        if(!value) return ""
        return `${value}`
    })
}
    
