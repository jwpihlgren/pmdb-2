export default interface TmdbDetailedMovieCreditResponse {
    cast: {
        adult: boolean
        cast_id: number
        character: string
        credit_id: string
        gender: number
        id: number
        known_for_department: string
        name: string
        order: number
        original_name: string
        popularity: number
        profile_path: string
    }[]
    crew: {
        adult: boolean
        credit_id: string
        department: string
        gender: number
        id: number
        job: string
        known_for_department: string
        name: string
        original_name: string
        popularity: number
        profile_path: string
    }[]
}
