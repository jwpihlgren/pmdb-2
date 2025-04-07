export default interface TmdbDetailedPeopleMovieCreditResponse {
    cast: {
        adult: boolean
        backdrop_path: string
        character: string
        credit_id: string
        genre_ids: number[]
        id: number
        order: number
        original_language: string
        original_title: string
        overview: string
        popularity: number
        poster_path: string
        release_date: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
    }[]
    crew: {
        adult: boolean
        backdrop_path: string
        credit_id: string
        department: string
        genre_ids: number[]
        id: number
        job: string
        original_language: string
        original_title: string
        overview: string
        popularity: number
        poster_path: string
        release_date: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
    }[]
    id: number
}
