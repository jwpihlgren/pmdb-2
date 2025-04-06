import { Gender } from "../types/gender"

export default interface Credits {
    cast: {
        adult: boolean,
        character: string,
        creditId: string,
        gender?: Gender 
        id: number
        name: string
        order: number
        originalName: string
        //popularity: number
        profilePath?: string
    }[]
    crew: {
        adult: boolean
        creditId: string
        department: string
        gender?: Gender
        id: number
        job: string
        knownForDepartment: string
        name: string
        originalName: string
        profilePath?: string
    }[]
}
