export interface Image {
    aspectRatio: number
    filePath: string
    height: number
    iso6391?: string
    voteAverage: number
    voteCount: number
    width: number
}

export default interface Images {
    backdrops: Image[],
    logos: Image[]
    posters: Image[],
}


