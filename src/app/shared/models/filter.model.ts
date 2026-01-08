// TYPES
export const filterTypes = {
    DATE: "date",
    STRING: "string",
    NUMBER: "number",
    BOOLEAN: "boolean"
} as const

export type FilterType = typeof filterTypes[keyof typeof filterTypes]

export type FilterValueTypes = {
    [filterTypes.DATE]: Date,
    [filterTypes.STRING]: string,
    [filterTypes.NUMBER]: number,
    [filterTypes.BOOLEAN]: boolean,
}

export type FilterValueType = keyof FilterValueTypes

export const filterValueOperator = {
    "and": "and",
    "or": "or"
} as const

export type FilterValueDelimiter = keyof typeof filterValueOperator

// FILTER
export interface Filter {
    readonly values: string[]
    readonly type: FilterValueType
    readonly operator: FilterValueDelimiter | undefined
}

// CONFIG
export interface FilterDefinition {
    readonly type: FilterValueType
    readonly multi: boolean
    readonly allowedValues?: string[]
}

export type FilterSet<K extends Record<string, unknown>> = {
    [P in keyof K]: Filter | undefined
}


export interface FilterConfigParseResult { result: string, errors?: string[] }

export interface FilterDefinitions<K extends Record<string, unknown>> {
    readonly filters: Record<keyof K, FilterDefinition>
}




