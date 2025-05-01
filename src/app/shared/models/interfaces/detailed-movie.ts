import Credits from "./credits"
import DetailedMovieCredits from "./detailed-movie-credits"
import { Image } from "./image"
import Keyword from "./keywords"
import Recommendations from "./recommendations"
import Trailer from "./trailer"

export interface DetailedMovie {
    backdropImagePath: string
    credits: DetailedMovieCredits
    genres: { id: number, name: string }[]
    hasVideo: boolean
    id: number
    images: {
        backdrops: Image[]
        logos: Image[]
        posters: Image[]
    }
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
    runtime: number
    spokenLanguages: { englishName: string, iso6391: string, name: string }[]
    status: string
    tagline: string
    title: string
    trailers: Trailer[]
    voteAverage: number
    voteCount: number
}




