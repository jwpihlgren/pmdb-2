export default interface MovieFilters {
    getQuery(): string
    includeAdult(value: boolean): void
    includeVideo(value: boolean): void
    withGenres(value: string[]): void
    voteAverageLte(value: number): void
    voteAverageGte(value: number): void
    releaseDateLte(value: Date): void
    releaseDateGte(value: Date): void
}


