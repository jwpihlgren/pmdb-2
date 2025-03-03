import Credits from "../interfaces/credits";
import TmdbCreditResponse from "../interfaces/tmdb/tmdb-credit-response";
import { Gender } from "../types/gender";
import TmdbGenderFactory from "./tmdbGenderFactory.class";

export default class TmdbCredits implements Credits {
    cast: {
        adult: boolean,
        character: string,
        creditId: string,
        gender: Gender
        id: number
        knownForDepartment: string
        name: string
        order: number
        originalName: string
        profilePath?: string

    }[];
    crew: {
        adult: boolean
        creditId: string
        department: string
        gender: Gender
        id: number
        job: string
        knownForDepartment: string
        name: string
        originalName: string
        profilePath?: string
    }[]


    constructor(credits: TmdbCreditResponse) {
        this.cast = this.mapCast(credits.cast)
        this.crew = this.mapCrew(credits.crew)
    }

    private mapCast(raw: TmdbCreditResponse["cast"]): Credits["cast"] {
        return raw.map(cast => {
            return {
                name: cast.name,
                id: cast.id,
                adult: cast.adult,
                character: cast.character,
                creditId: cast.credit_id,
                gender: "Undefined",
                knownForDepartment: cast.known_for_department,
                order: cast.order,
                originalName: cast.original_name,
                profilePath: cast.profile_path
            }
        })
    }
    private mapCrew(raw: TmdbCreditResponse["crew"]): Credits["crew"] {
        return raw.map(crew => {
            return {
                name: crew.name,
                id: crew.id,
                adult: crew.adult,
                creditId: crew.credit_id,
                gender:  TmdbGenderFactory.create(crew.gender),
                knownForDepartment: crew.known_for_department,
                originalName: crew.original_name,
                profilePath: crew.profile_path,
                department: crew.department,
                job: crew.job,
                knowForDepartment: crew.known_for_department

            }
        })

    }
}
