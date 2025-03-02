export interface DetailedMovie {
    backdropImagePath: string
    //belongs_to_collection: string
    //budget: number
    genres: { id: number, name: string }[]
    credits: Credits
    //homepage: string
    id: number
    imdbId: string
    images: {
        backdrops: Image[]
        posters: Image[]
        logos: Image[]
    }
    originalLanguage: string
    originalTitle: string
    overview: string
    popularity: number
    posterImagePath: string
    keywords: Keyword[]
    productionCompanies: { id: number, logoPath: string, name: string, originCountry: string }[]
    productionCountries: { iso31661: string, name: string }[]
    releaseDate: string
    //revenue: number
    runtime: number
    spokenLanguages: { englishName: string, iso6391: string, name: string }[]
    status: string
    tagline: string
    title: string
    hasVideo: boolean
    voteAverage: number
    voteCount: number
}



const Gender = {
    0: "Undefined",
    1: "Female",
    2: "Male",
} as const


interface Credits {
    cast: {
        adult: boolean,
        castId: number,
        character: string,
        creditId: string,
        gender: typeof Gender 
        id: number
        knownForDepartment: string
        name: string
        order: number
        originalName: string
        //popularity: number
        profilePath: string
    }
    crew: {
        adult: boolean
        creditId: string
        department: string
        gender: typeof Gender
        id: number
        job: string
        knowForDepartment: string
        name: string
        originalName: string
        profilePath?: string
    }
}


interface Keyword {
    id: number
    name: string
}

interface Image {
    aspectRatio: number
    height: number
    filePath: string
    iso6391?: string
    voteAverage: number
    voteCount: number
    width: number
}


