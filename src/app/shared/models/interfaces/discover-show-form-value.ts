import { Selectable } from "./selectable"

export interface DiscoverShowFormValue {
    genres: Selectable[]
    include: {adult: boolean | null, video: boolean | null}
    firstAirDate: {lte: Selectable | undefined, gte: Selectable | undefined}
    voteAverage: {lte: Selectable | undefined, gte: Selectable | undefined}
    withKeywords: {keywords: Selectable[], pipe: "and" | "or"}
}
