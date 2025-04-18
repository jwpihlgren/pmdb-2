export default interface Credits {
    cast: {
        adult: boolean,
        character: string,
        creditId: string,
        id: number
        name: string
        originalName: string
        popularity: number
        posterPath: string
    }[]
    crew: {
        adult: boolean
        creditId: string
        department: string
        id: number
        job: string
        knownForDepartment: string
        name: string
        originalName: string
        popularity: number
        posterPath: string
    }[]
}
