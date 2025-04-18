import Gender from '../types/gender'
export default interface DetailedMovieCredits {
    cast: {
        adult: boolean,
        castId: number
        character: string
        creditId: string
        gender: Gender
        id: number
        knowForDepartment: string
        name: string
        order: number
        originalName: string
        popularity: number
        profilePath: string
    }[]
    crew: {
        adult: boolean
        creditId: string
        department: string
        gender: Gender
        id: number
        job: string
        knowForDepartment: string
        name: string
        originalName: string
        popularity: number
        profilePath: string
    }[]
}
