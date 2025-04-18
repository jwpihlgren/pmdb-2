export default interface TmdbDetailedPeopleShowCreditResponse {
    cast: {
        adult: boolean
        backdrop_path: string
        character: string
        credit_id: string
        episode_count: number
        first_air_date: string
        genre_ids: number[]
        id: number
        name: string
        origin_country: string[]
        original_language: string
        original_name: string
        overview: string
        popularity: number
        poster_path: string
        vote_average: number
        vote_count: number
    }[]
    crew: {
        adult: boolean
        backdrop_path: string
        credit_id: string
        department: string
        episode_count: number
        first_air_date: string
        genre_ids: number[]
        id: number
        job: string
        name: string
        origin_country: string[]
        original_language: string
        original_name: string
        overview: string
        popularity: number
        poster_path: string
        vote_average: number
        vote_count: number
    }[]
    id: number
}
