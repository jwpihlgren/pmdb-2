abstract class QueryBuilder<Q> {
    private _query: string[] = []
    private endpoint
    private api

    constructor(api: string, endpoint: string) {
        this.api = api
        this.endpoint = endpoint
    }

    get url(): string {
        let url: string = [this.api ,this.endpoint].join("")
        if(this.query !== "") url += this.query

        return url
    }

    get query(): string {
        return `?${this._query.join("&")}`
    }

    apiKey = this.paramFactory(this as any, "api_key", (value: string) => {
        return `${value}`
    })

    page = this.paramFactory(this as any, "page", (value?: number) => {
        if (!value) return ""
        return `${value.toString()}`
    })

    protected dropParam(name: string): void {
        this._query = [...this._query].filter(elem => !elem.includes(name))
    }

    protected addParam(param: string): void {
        this._query.push(param)
    }

    protected findParamIndex(name: string): number {
        return this._query.findIndex((param: string) => param.includes(name))
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
