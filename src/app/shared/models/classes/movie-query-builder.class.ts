export default class MovieQueryBuilder {

    private query: string[]
    private errors: any[]

    constructor() {
        this.query = []
        this.errors = []
    }

    getQuery(): string {
        return `?${this.query.join("&")}`
    }

    includeAdult = this.QueryFactory<boolean, undefined>("include_adult", (value: boolean) => {
        return `include_adult=${value}`
    })

    includeVideo = this.QueryFactory<boolean, undefined>("include_video", (value: boolean) => {
        return `include_video=${value}`
    })

    withGenres = this.QueryFactory<string[], Operator>("with_genres", (value: string[], options: Operator = "or") => {
        if (value.length === 0) return ""
        const operator = options === "or" ? "," : "|"
        return `with_genres=${value.join(operator)}`
    })

    withPeople = this.QueryFactory<string[], Operator>("with_people", (value: string[], options: Operator = "or") => {
        if (value.length === 0) return ""
        const operator = options === "or" ? "," : "|"
        return `with_people=${value.join(operator)}`
    })

    voteAverageLte = this.QueryFactory<number>("vote_average.lte", (value: number) => {
        return `vote_average.lte=${value}`
    })

    voteAverageGte = this.QueryFactory<number>("vote_average.gte", (value: number) => {
        return `vote_average.gte=${value}`
    })


    private dropParam(index: number): void {
        this.query.splice(index)
    }

    private addParam(param: string): void {
        this.query.push(param)
    }

    private findParamIndex(p: string): number {
        return this.query.findIndex((param: string) => param.includes(p))
    }

    private QueryFactory<T, V = undefined>(param: string, transform: (value: T, options?: V) => string): (value: T, options?: V) => MovieQueryBuilder {
        return (value: T, options?: V) => {
            const previousParamIndex = this.findParamIndex(param)
            if (previousParamIndex >= 0) {
                this.dropParam(previousParamIndex)
            }
            const queryParam = transform(value, options)
            if (queryParam !== "") {
                this.addParam(transform(value, options))
            }
            return this
        }
    }
}


type Operator = "or" | "and"
