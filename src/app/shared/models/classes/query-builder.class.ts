abstract class QueryBuilder<Q> {
    private query: string[] = []

    getQuery(): string {
        return `?${this.query.join("&")}`
    }

    apiKey = this.paramFactory(this as any, "api_key", (value: string) => {
        return `${value}`
    })

    protected dropParam(index: number): void {
        this.query.splice(index)
    }

    protected addParam(param: string): void {
        this.query.push(param)
    }

    protected findParamIndex(name: string): number {
        return this.query.findIndex((param: string) => param.includes(name))
    }
    protected paramFactory<T, V = undefined>(derived: Q, name: string, parse: (value: T, options?: V) => string): (value: T, options?: V) => Q {
        return (value: T, options?: V) => {
            const previousParamIndex = this.findParamIndex(name)
            if (previousParamIndex >= 0) {
                this.dropParam(previousParamIndex)
            }
            const parsedValue = parse(value, options)
            if (parsedValue !== "") {
                this.addParam(`${name}=${parsedValue}`)
            }
            return derived
        }
    }

}
export default QueryBuilder
