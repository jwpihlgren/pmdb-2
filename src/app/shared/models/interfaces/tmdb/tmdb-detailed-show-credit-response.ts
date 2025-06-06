export default interface TmdbShowCreditResponse {
    id: number
    cast: {
        adult: boolean
        backdrop_path: string
        genre_ids: number[]
        id: number
        origin_country: string[]
        original_language: string
        original_name: string
        overview: string
        popularity: number
        poster_path: string
        first_air_date: string
        name: string
        vote_average: number
        vote_count: number
        character: string
        credit_id: string
        episode_count: number
    }[]
    crew: {
        adult: boolean
        backdrop_path: string
        genre_ids: number[]
        id: number
        origin_country: string[]
        original_language: string
        original_name: string
        overview: string
        popularity: number
        poster_path: string
        first_air_date: string
        name: string
        vote_average: number
        vote_count: number
        credit_id: string
        department: string
        episode_count: number
        job: string
    }[]
}
