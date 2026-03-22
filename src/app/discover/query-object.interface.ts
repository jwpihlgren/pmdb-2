
export interface QueryViolation {
    field: string
    value: string
    reason: string
}

export interface ParseResult<T> {
    query: T,
    violations: QueryViolation[]
}


export interface QueryObject<T> {
    toParams(): Record<string, string>
    with(partial: Partial<T>): T
}


export interface QueryObjectStatic<T> {
    fromParams(params: Record<string, string>): ParseResult<T>
}
