import AspectRatio from "../types/aspect-ratio.type"

export interface Image {
    aspectRatio: AspectRatio
    filePath: string
    height: number
    iso6391?: string
    voteAverage: number
    voteCount: number
    width: number
}

