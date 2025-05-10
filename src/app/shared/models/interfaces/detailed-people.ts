import Gender from "../types/gender"
import { CustomPageTitle } from "./custom-page-title"
import Filmography from "./filmography.interface"
import { Image } from "./image"

export default interface DetailedPeople extends CustomPageTitle {
    adult: boolean
    alsoKnownAs: string[]
    biography: string
    birthday: string
    customPageTitle: string
    deathday?: string
    gender: Gender
    homepage: string
    id: number
    images: Image[]
    imdbId: string
    knownForDepartment: string
    //movieCredits: Credits
    filmography: Filmography
    name: string
    placeOfBirth: string
    popularity: number
    profilePath: string
    //showCredits: Credits
}
