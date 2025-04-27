import Filmography, { CreditedMovie, CreditedMovieActor, CreditedMovieCrew, CreditedShow, CreditedShowActor, CreditedShowCrew } from "../interfaces/filmography.interface";
import TmdbDetailedPeopleMovieCreditResponse from "../interfaces/tmdb/tmdb-detailed-people-movie-credits-response";
import TmdbShowCreditResponse from "../interfaces/tmdb/tmdb-detailed-show-credit-response";

interface GroupByDepartment { department: string, count: number }
export default class TmdbFilmography implements Filmography {
    countShowsActor: number;
    countShows: number;
    countMovies: number;
    countMovieCrew: number;
    countShowsCrew: number;
    countMovieActor: number;
    countShowsPerDepartment: GroupByDepartment[];
    countMoviesPerDepartment: GroupByDepartment[];
    allShows: CreditedShow[] 
    allMovies: CreditedMovie[] 
    top10LatestShows: CreditedShow[];
    top10LatestMovies: CreditedMovie[];

    constructor(credits: { tv_credits: TmdbShowCreditResponse, movie_credits: TmdbDetailedPeopleMovieCreditResponse }) {
        this.countShowsActor = credits.tv_credits.cast.length
        this.countShowsCrew = credits.tv_credits.crew.length
        this.countShows = this.countShowsActor + this.countShowsCrew
        this.countMovieActor = credits.movie_credits.cast.length
        this.countMovieCrew = credits.movie_credits.crew.length
        this.countMovies = this.countMovieActor + this.countMovieCrew
        this.countShowsPerDepartment = this.mapDepartment(credits.tv_credits)
        this.countMoviesPerDepartment = this.mapDepartment(credits.movie_credits)
        this.allShows = this.mapShows(credits.tv_credits)
        this.allMovies = this.mapMovies(credits.movie_credits)
        this.top10LatestMovies = this.getTop10Movies()
        this.top10LatestShows = this.getTop10Shows()
    }

    mapDepartment(credits: TmdbDetailedPeopleMovieCreditResponse | TmdbShowCreditResponse): GroupByDepartment[] {
        const grouped: { [key: string]: number } = credits.crew.reduce((acc, cur) => {
            acc[cur.department] ? acc[cur.department]++ : acc[cur.department] = 1
            return acc
        }, {} as { [key: string]: number })

        return Object.entries(grouped).map((k) => { return { department: k[0], count: k[1] } })
    }

    mapShows(credits: TmdbShowCreditResponse): CreditedShow[] {
        const shows: CreditedShow[] = []
        credits.crew.forEach(c => {
            shows.push({
                backdropImagePath: c.backdrop_path,
                job: c.job,
                id: c.id,
                countEpisodes: c.episode_count,
                firstAirDate: c.first_air_date,
                overview: c.overview,
                posterImagePath: c.poster_path,
                title: c.name,
                voteAverage: c.vote_average,
                mediaType: "show",
                creditType: "crew"
            })
        })
        credits.cast.forEach(c => {
            shows.push({
                backdropImagePath: c.backdrop_path,
                character: c.character,
                id: c.id,
                countEpisodes: c.episode_count,
                firstAirDate: c.first_air_date,
                overview: c.overview,
                posterImagePath: c.poster_path,
                title: c.name,
                voteAverage: c.vote_average,
                mediaType: "show",
                creditType: "cast"
            })
        })
        return shows
    }

    mapMovies(credits: TmdbDetailedPeopleMovieCreditResponse): CreditedMovie[] {
        const movies: CreditedMovie[] = []
        credits.crew.forEach(c => {
            movies.push({
                backdropImagePath: c.backdrop_path,
                id: c.id,
                job: c.job,
                overview: c.overview,
                posterImagePath: c.poster_path,
                releaseDate: c.release_date,
                title: c.title,
                voteAverage: c.vote_average,
                mediaType: "movie",
                creditType: "crew"
            })
        })
        credits.cast.forEach(c => {
            movies.push({
                backdropImagePath: c.backdrop_path,
                character: c.character,
                id: c.id,
                overview: c.overview,
                posterImagePath: c.poster_path,
                releaseDate: c.release_date,
                title: c.title,
                voteAverage: c.vote_average,
                mediaType: "movie",
                creditType: "cast"
            })
        })
        return movies
    }

    getTop10Movies(): CreditedMovie[] {
        const movies = this.allMovies.sort((a, b) => a.releaseDate < b.releaseDate ? 1 : a.releaseDate > b.releaseDate ? -1 : 0)
        return movies.slice(0, 10)
    }
    getTop10Shows(): CreditedShow[] {
        const shows = this.allShows.sort((a, b) => a.firstAirDate < b.firstAirDate ? 1 : a.firstAirDate > b.firstAirDate ? -1 : 0)
        return shows.slice(0, 10)
    }
}
