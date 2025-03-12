import Filmography, { CreditedMovie, CreditedMovieActor, CreditedMovieCrew, CreditedShow, CreditedShowActor, CreditedShowCrew } from "../interfaces/filmography.interface";
import TmdbCreditResponse from "../interfaces/tmdb/tmdb-credit-response";

interface GroupByDepartment { department: string, count: number}
export default class TmdbFilmography implements Filmography {
    countShowsActor: number;
    countShows: number;
    countMovies: number;
    countMovieCrew: number;
    countShowsCrew: number;
    countMovieActor: number;
    countShowsPerDepartment: GroupByDepartment[];
    countMoviesPerDepartment: GroupByDepartment[];
    allShows: { actor: CreditedShowActor[]; crew: CreditedShowCrew[]; };
    allMovies: { actor: CreditedMovieActor[]; crew: CreditedMovieCrew[]; };
    top10LatestShows: CreditedShow[];
    top10LatestMovies: (CreditedMovie)[];

    constructor(credits: {tv_credits: TmdbCreditResponse, movie_credits: TmdbCreditResponse} ) {
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
        this.top10LatestMovies = this.getTop10()
        this.top10LatestShows = this.gettop10()
    }

    mapDepartment(credits: TmdbCreditResponse): GroupByDepartment[] {
        const grouped: {[key: string]: number} = credits.crew.reduce((acc, cur) => {
            acc[cur.department] ? acc[cur.department]++ : acc[cur.department] = 1
            return acc
        }, {} as {[key: string]: number})

        return Object.entries(grouped).map((k) => {return {department: k[0], count: k[1]}})
    }

    mapShows(credits: TmdbCreditResponse): {actor: CreditedShowActor[], crew: CreditedShowCrew[]}{
        
    }
    mapMovies(credits: TmdbCreditResponse): {actor: CreditedMovieActor[], crew: CreditedMovieCrew[]}{
        
    }

    getTop10(): Creditedmovie[] | CreditedShow[]{

    }
 
}
