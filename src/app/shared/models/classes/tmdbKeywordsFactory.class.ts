import Keyword from "../interfaces/keywords"
import TmdbKeywordsResponse from "../interfaces/tmdb/tmdb-keywords-response"

export class TmdbKeywordsFactory {
    static create(data: TmdbKeywordsResponse): Keyword[] {
        let keywords = data.keywords ?? data.results!
        return keywords.map(keyword => {
            return { name: keyword.name, id: keyword.id.toString() }
        })
    }
}
