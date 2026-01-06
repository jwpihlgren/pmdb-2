export class UrlBuilder {

    private baseUrl: string
    private endpoint?: string
    private params: Map<string, string> = new Map()
    private constructor(url: string, endpoint?: string) { this.baseUrl = url, this.endpoint = endpoint }

    static new(url: string, endpoint?: string): UrlBuilder {
        return new UrlBuilder(url, endpoint)
    }

    setBaseUrl(url: string): this {
        this.baseUrl = url
        return this
    }

    setEndpoint(endpoint: string): this {
        this.endpoint = endpoint
        return this
    }

    getBaseUrl(): string {
        return this.baseUrl.toString()
    }

    getEndpoint(): string | undefined {
        return this.endpoint?.toString()
    }

    setParam(key: string, value: string): this {
        this.params.set(key, value)
        return this
    }

    removeParam(key: string): this {
        this.params.delete(key)
        return this
    }

    hasParam(key: string): boolean {
        return this.params.has(key)
    }

    getParam(key: string): string | undefined {
        const value = this.params.get(key)
        if (!value) return undefined
        return this.paramToString(key, value)
    }

    getAllParams(): string[] {
        const stringifiedParams = Object.entries(this.params).map(([k, v]) => {
            return this.paramToString(k, v)
        })
        return stringifiedParams
    }

    appendParams(params: string): this {
        if (!params || params.trim() === "") return this;

        for (const p of params.split("&")) {
            if (!p) continue;

            const [key, value] = p.split("=");
            if (!key) continue;              // skip empty keys
            if (value === undefined) continue; // skip missing values (prevents "=undefined")

            this.setParam(key, value);
        }

        return this;
    }

    clearParams(): this {
        this.params.clear()
        return this
    }

    build(): string {
        const entries = Array.from(this.params.entries())
            .filter(([k, v]) => k && k.trim() !== "" && v !== undefined && v !== null)
            .sort(([a], [b]) => String(a).localeCompare(String(b)));

        const query = entries
            .map(([k, v]) => `${encodeURIComponent(String(k))}=${encodeURIComponent(String(v))}`)
            .join("&");

        return query ? `${this.baseUrl}?${query}` : this.baseUrl;
    }

    private paramToString(key: string, value: string): string {
        return `${key}=${value}`
    }
}
