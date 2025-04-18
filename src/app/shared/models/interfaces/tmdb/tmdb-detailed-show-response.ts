import TmdbResponseWrapper from "./tmdb-response-wrapper"

export interface TmdbDetailedShowResponse {
    adult: boolean
    backdrop_path: string
    created_by: {
        id: number
        credit_id: string
        name: string
        gender: number
        profile_path: string
    }[],
    credits: TmdbDetailedShowCreditsResponse
    episode_run_time: number[],
    external_ids: {
        id: number
        imdb_id: string
        freebase_mid: string
        freebase_id: string
        tvdb_id: number
        tvrage_id: number
        wikidata_id: string
        facebook_id: string
        instagram_id: string
        twitter_id: string
    }
    first_air_date: string
    genres: {
        id: number
        name: string
    }[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: {
        id: number
        name: string
        overview: string
        vote_average: number
        vote_count: number
        air_date: string
        episode_number: number
        production_code: string
        runtime: number
        season_number: number
        show_id: number
        still_path: string
    }
    name: string
    next_episode_to_air: string
    networks: {
        id: number
        logo_path: string
        name: string
        origin_country: string
    }[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: {
        id: number
        logo_path: string
        name: string
        origin_country: string
    }[]
    production_countries: {
        iso_3166_1: string
        name: string
    }[]
    recommendations: TmdbDetailedShowRecommendationsResponse
    seasons: {
        air_date: string
        episode_count: number
        id: number
        name: string
        overview: string
        poster_path: string
        season_number: number
        vote_average: number
    }[]
    spoken_languages: {
        english_name: string
        iso_639_1: string
        name: string
    }[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
}


export interface TmdbDetailedShowCreditsResponse {
    cast: {
        adult: boolean
        gender: number
        id: number
        known_for_department: string
        name: string
        original_name: string
        popularity: number
        profile_path: string
        character: string
        credit_id: string
        order: number
    }[]
    crew: {
        adult: boolean
        gender: number
        id: number
        known_for_department: string
        name: string
        original_name: string
        popularity: number
        profile_path: string
        credit_id: string
        department: string
        job: string
    }[]

}

export interface TmdbDetailedShowRecommendationsResponse extends TmdbResponseWrapper {
    results: {
        adult: boolean
        backdrop_path: string
        id: number
        name: string
        original_language: string
        original_name: string
        overview: string
        poster_path: string
        media_type: string
        genre_ids: number[]
        popularity: number
        first_air_date: string
        vote_average: number
        vote_count: number
        origin_country: string[]
    }[]
}
