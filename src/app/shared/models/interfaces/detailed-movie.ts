import Credits from "./credits"
import Images from "./images"
import Keyword from "./keywords"
import Recommendations from "./recommendations"
import Trailer from "./trailer"

export interface DetailedMovie {
    backdropImagePath: string
    //belongs_to_collection: string
    //budget: number
    credits: Credits
    genres: { id: number, name: string }[]
    hasVideo: boolean
    //homepage: string
    id: number
    images: Images
    imdbId: string
    keywords: Keyword[]
    originalLanguage: string
    originalTitle: string
    overview: string
    popularity: number
    posterImagePath: string
    productionCompanies: { id: number, logoPath: string, name: string, originCountry: string }[]
    productionCountries: { iso31661: string, name: string }[]
    recommendations: Recommendations
    releaseDate: string
    //revenue: number
    runtime: number
    spokenLanguages: { englishName: string, iso6391: string, name: string }[]
    status: string
    tagline: string
    title: string
    trailers: Trailer[]
    voteAverage: number
    voteCount: number
}




