export interface PeopleSearchResult {
    id: number
    name: string
    popularity: number
    profilePath: string
    knownFor: {
        title: string
        mediaType: string
        id: number
    }[]
}
