import { DetailedSeason } from "../interfaces/detailed-season";
import { TmdbDetailedSeasonResponse } from "../interfaces/tmdb/tmdb-detailed-season-response";
import Gender from "../types/gender";
import TmdbGenderFactory from "./tmdbGenderFactory.class";

export class TmdbDetailedSeason implements DetailedSeason {
    _id: string;
    airDate: string;
    episodes: {
        airDate: string;
        episodeNumber: number;
        id: number;
        name: string;
        overview: string;
        productionCode: string;
        runtime: number;
        seasonNumber: number;
        showId: number;
        stillPath: string;
        voteAverage: number;
        voteCount: number;
        crew: {
            adult: boolean;
            creditId: string;
            department: string;
            gender: Gender;
            id: number;
            job: string;
            knownForDepartment: string;
            name: string;
            originalName: string;
            popularity: number;
            profilePath: string;
        }[];
        guestStars: {
            adult: boolean;
            character: string;
            creditId: string;
            gender: Gender;
            id: number;
            knownForDepartment: string;
            name: string;
            order: number;
            originalName: string;
            popularity: number;
            profilePath: string;
        }[];

    }[];
    id: number;
    name: string;
    overview: string;
    posterPath: string;
    seasonNumber: number;
    voteAverage: number;

    constructor(raw: TmdbDetailedSeasonResponse) {
        this._id = raw._id,
        this.airDate = raw.air_date
        this.episodes = this.mapEpisodes(raw.episodes)
        this.id = raw.id,
        this.name = raw.name,
        this.overview = raw.overview,
        this.posterPath = raw.poster_path,
        this.seasonNumber = raw.season_number
        this.voteAverage = raw.vote_average
    }


    mapEpisodes(raw: TmdbDetailedSeasonResponse["episodes"]): DetailedSeason["episodes"] {
        return raw.map(e => {
            const episode: DetailedSeason["episodes"][0] = { 
                airDate: e.air_date,
                crew: this.mapCrew(e.crew),
                episodeNumber: e.season_number ,
                guestStars: this.mapGuestStars(e.guest_stars),
                id: e.id,
                name: e.name,
                overview: e.overview,
                productionCode: e.production_code,
                runtime: e.runtime,
                seasonNumber: e.season_number,
                showId: e.show_id,
                stillPath: e.still_path,
                voteAverage: e.vote_average,
                voteCount: e.vote_count,
            }

            return episode
        })
    }

    mapCrew(raw: TmdbDetailedSeasonResponse["episodes"][0]["crew"][0][]): DetailedSeason["episodes"][0]["crew"][0][] {
        return raw.map(c => {
            return {
                adult: c.adult,
                creditId: c.credit_id,
                department: c.department,
                gender: TmdbGenderFactory.create(c.gender),
                id: c.id,
                job: c.job,
                knownForDepartment: c.known_for_department,
                name: c.name,
                originalName: c.original_name,
                popularity: c.popularity,
                profilePath: c.profile_path
            }
        })
    }


    mapGuestStars(raw: TmdbDetailedSeasonResponse["episodes"][0]["guest_stars"][0][]): DetailedSeason["episodes"][0]["guestStars"][0][] {
        return raw.map(c => {
            return {
                adult: c.adult,
                character: c.character,
                creditId: c.credit_id,
                gender: TmdbGenderFactory.create(c.gender),
                id: c.id,
                knownForDepartment: c.known_for_department,
                name: c.name,
                order: c.order,
                originalName: c.original_name,
                popularity: c.popularity,
                profilePath: c.profile_path
            }
        })
    }
}
