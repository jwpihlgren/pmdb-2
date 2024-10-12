export interface DetailedMovie {
    backdropImagePath: string
    //belongs_to_collection: string
    //budget: number
    genres: { id: number, name: string }[]
    //homepage: string
    id: number
    imdbId: string
    originalLanguage: string
    originalTitle: string
    overview: string
    popularity: number
    posterImagePath: string
    productionCompanies: { id: number, logoPath: string, name: string, originCountry: string }[]
    productionCountries: { iso31661: string, name: string }[]
    releaseDate: string
    //revenue: number
    runtime: number
    spokenLanguages: { englishName: string, iso6391: string, name: string }[]
    status: string
    //tagline: string
    title: string
    hasVideo: boolean
    voteAverage: number
    voteCount: number
}
