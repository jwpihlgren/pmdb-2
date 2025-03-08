import TmdbResponseWrapper from "./tmdb-response-wrapper"

export interface TmdbResultPeopleResponse extends TmdbResponseWrapper {
    results: {
        adult: boolean
        gender: number
        id: number
        known_for_department: string
        name: string
        original_name: string
        media_type?: string
        popularity: number
        profile_path: string
        known_for: {
            adult: boolean
            backdrop_path: string
            id: number
            title: string
            original_language: string
            original_title: string
            overview: string
            poster_path: string
            media_type: string
            genre_ids: number[]
            popularity: number
            release_date: string
            video: boolean
            vote_average: number
            vote_count: number
        }[]
    }[]
}
