import Credits from "../interfaces/credits";
import DetailedPeople from "../interfaces/detailed-people";
import { Image } from "../interfaces/images";
import TmdbDetailedPeopleResponse from "../interfaces/tmdb/tmdb-detailed-people-response";
import { Gender } from "../types/gender";
import TmdbCredits from "./tmdbCredits.class";
import TmdbGenderFactory from "./tmdbGenderFactory.class";
import { TmdbImages } from "./tmdbImages.class";

export default class TmdbDetailedPeople implements DetailedPeople {
    adult: boolean;
    alsoKnownAs: string[];
    biography: string;
    birthday: string;
    deathday: string;
    gender: Gender;
    homepage: string;
    id: number;
    images: Image[];
    imdbId: string;
    knownForDepartment: string;
    movieCredits: Credits;
    name: string;
    placeOfBirth: string;
    popularity: number;
    profilePath: string;
    showCredits: Credits;


    constructor(tmdbDetailedPeople: TmdbDetailedPeopleResponse){
        this.adult = tmdbDetailedPeople.adult
        this.alsoKnownAs = tmdbDetailedPeople.also_known_as
        this.biography = tmdbDetailedPeople.biography
        this.birthday = tmdbDetailedPeople.birthday
        this.deathday = tmdbDetailedPeople.deathday
        this.gender = TmdbGenderFactory.create(tmdbDetailedPeople.gender)
        this.homepage = tmdbDetailedPeople.homepage
        this.id = tmdbDetailedPeople.id
        this.images = this.mapImages(tmdbDetailedPeople.images)
        this.imdbId = tmdbDetailedPeople.imdb_id
        this.knownForDepartment = tmdbDetailedPeople.known_for_department
        this.movieCredits = this.mapCredits(tmdbDetailedPeople.movieCredits)
        this.name = tmdbDetailedPeople.name
        this.placeOfBirth = tmdbDetailedPeople.place_of_birth
        this.profilePath = tmdbDetailedPeople.profile_path
        this.showCredits = this.mapCredits(tmdbDetailedPeople.showCredits)
        this.popularity = tmdbDetailedPeople.popularity
    }

    mapImages(raw: TmdbDetailedPeopleResponse["images"]): Image[] {
        return raw.profiles.map(image => new TmdbImages(image))
    }

    mapCredits(raw: TmdbDetailedPeopleResponse["movieCredits" | "showCredits"]): Credits {
        return new TmdbCredits(raw)
    }
}

