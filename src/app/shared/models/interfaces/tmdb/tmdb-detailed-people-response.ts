import TmdbMovieCreditResponse from "./tmdb-credit-response"
import TmdbImage from "./tmdb-image"

export default interface TmdbDetailedPeopleResponse {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: string
    gender: number
    homepage: string
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string
    images: {
        profiles: TmdbImage[]
    }
    movie_credits: TmdbMovieCreditResponse
    tv_redits: TmdbMovieCreditResponse
}
