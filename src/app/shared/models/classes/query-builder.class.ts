abstract class QueryBuilder<Q> {
    private query: string[] = []

    getQuery(): string {
        return `?${this.query.join("&")}`
    }

    apiKey = this.paramFactory(this as any, "api_key", (value: string) => {
        return `${value}`
    })

    page = this.paramFactory(this as any, "page", (value?: number) => {
        if(!value) return ""
        return `${value.toString()}`
    })

    protected dropParam(name: string): void {
        this.query = [...this.query].filter(elem => !elem.includes(name))
    }

    protected addParam(param: string): void {
        this.query.push(param)
    }

    protected findParamIndex(name: string): number {
        return this.query.findIndex((param: string) => param.includes(name))
    }
    protected paramFactory<T, V = undefined>(derived: Q, name: string, parse: (value: T, options?: V) => string): (value: T, options?: V) => Q {
        return (value: T, options?: V) => {

            const parsedValue = parse(value, options)
            this.dropParam(name)
            if (parsedValue !== "") {
                this.addParam(`${name}=${parsedValue}`)
            }
            return derived
        }
    }

}
export default QueryBuilder
