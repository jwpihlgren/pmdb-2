export default interface Filmography {
    countMovies: number
    countMovieCrew: number
    countMovieActor: number
    countShows: number
    countShowsCrew: number
    countShowsActor: number
    countShowsPerDepartment: { department: string, count: number }[]
    countMoviesPerDepartment: { department: string, count: number }[]
    top10LatestMovies: CreditedMovie[]
    allMovies: CreditedMovie[] 
    top10LatestShows: CreditedShow[]
    allShows: CreditedShow[]
}

export type CreditedMovie = CreditedMovieActor | CreditedMovieCrew

export interface CreditedMovieActor {
    backdropImagePath: string
    id: number
    overview: string
    posterImagePath: string
    releaseDate: string
    title: string
    voteAverage: number
    character: string
    mediaType: "movie"
    creditType: "cast"
}

export interface CreditedMovieCrew {
    backdropImagePath: string
    id: number
    overview: string
    posterImagePath: string
    releaseDate: string
    title: string
    voteAverage: number
    job: string
    mediaType: "movie"
    creditType: "crew"
}

export type CreditedShow = CreditedShowActor | CreditedShowCrew

export interface CreditedShowActor {
    backdropImagePath: string
    countEpisodes: number
    firstAirDate: string
    id: number
    overview: string
    posterImagePath: string
    title: string
    voteAverage: number
    character: string
    mediaType: "show"
    creditType: "cast"
}

export interface CreditedShowCrew {
    backdropImagePath: string
    countEpisodes: number
    firstAirDate: string
    id: number
    overview: string
    posterImagePath: string
    title: string
    voteAverage: number
    job: string
    mediaType: "show"
    creditType: "crew"
}
