export interface ShowFilters {
    url: string
    query: string
    page(value?: number): ShowFilters
    apiKey(value: string): ShowFilters
    includeAdult(value: boolean): ShowFilters
    includeVideo(value: boolean): ShowFilters
    withGenres(value: string[]): ShowFilters
    voteAverageLte(value: number): ShowFilters
    voteAverageGte(value: number): ShowFilters
    firstAirDateLte(value: [number, number, number]): ShowFilters
    firstAirDateGte(value: [number, number, number]): ShowFilters

}
