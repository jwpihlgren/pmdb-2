export default interface MovieFilters {
    getQuery(): string
    page(value?: number): MovieFilters
    apiKey(value: string): MovieFilters
    includeAdult(value: boolean): MovieFilters
    includeVideo(value: boolean): MovieFilters
    withGenres(value: string[]): MovieFilters
    voteAverageLte(value: number): MovieFilters
    voteAverageGte(value: number): MovieFilters
    releaseDateLte(value: [number, number, number]): MovieFilters
    releaseDateGte(value: [number, number, number]): MovieFilters
    //withOriginCountry(value: string): MovieFilters
    //withPeople(value: string[]): MovieFilters
}


