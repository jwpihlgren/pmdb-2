import { TmdbResponseWrapper } from "./tmdb-response-wrapper"

export default interface TmdbReviewsResponse extends TmdbResponseWrapper{
    results: {
        author: string
        author_details: {
            name: string
            username: string
            avatar_path: string
            rating: string
        }
        content: string
        created_at: string
        id: string
        updated_at: string
        url: string

    }[]
}
