export default interface TmdbKeywordsResponse {
    id: number
    keywords?: {
        id: number
        name: string
    }[]
    results?: {
        id: number
        name: string
    }[]
}
