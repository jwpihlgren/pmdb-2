export default interface Filmography {
    countMovies: number
    countMovieCrew: number
    countMovieActor: number
    countShows: number
    countShowsCrew: number
    countShowsActor: number
    countPerDepartment: { department: string, count: number }[]
    top10LatestMovies: CreditedMovie[]
    allMovies: {actor: CreditedMovieActor[], crew: CreditedMovieCrew[]}
    top10LatestShows: CreditedShow[]
    allShows: {actor: CreditedShowActor[], crew: CreditedShowCrew[]}
}

type CreditedMovie = CreditedMovieActor | CreditedMovieCrew

interface CreditedMovieActor {
    backdropImagePath: string
    id: number
    overview: string
    posterImagePath: string
    releaseDate: string
    title: string
    voteAverage: number
    character: string
}

interface CreditedMovieCrew {
    backdropImagePath: string
    id: number
    overview: string
    posterImagePath: string
    releaseDate: string
    title: string
    voteAverage: number
    job: string
}

type CreditedShow = CreditedShowActor | CreditedShowCrew

interface CreditedShowActor {
    backdropImagePath: string
    countEpisodes: number
    firstAirDate: string
    id: number
    overview: string
    posterImagePath: string
    title: string
    voteAverage: number
    character: string
}

interface CreditedShowCrew {
    backdropImagePath: string
    countEpisodes: number
    firstAirDate: string
    id: number
    overview: string
    posterImagePath: string
    title: string
    voteAverage: number
    job: string
}
