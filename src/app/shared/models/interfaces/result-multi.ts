export default interface ResultMulti {
    endDate?: string
    id: number
    name: string
    originalLanguage?: string
    originalName: string
    overview: string
    popularity: number
    posterPath: string
    releaseDate?: string
    stub: "people" | "movies" | "shows"
    mediaType: string
}
