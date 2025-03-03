import Keyword from "../interfaces/keywords"
import TmdbKeywordsResponse from "../interfaces/tmdb/tmdb-keywords-response"

export class TmdbKeywordsFactory {

    static create(data: TmdbKeywordsResponse): Keyword[] {
        return data.keywords.map(keyword => {
            return{name: keyword.name, id: keyword.id}
        })
    }
}
