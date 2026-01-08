import { FilterSet } from "../../models/filter.model";

export type AdapterError =
    | { kind: "unsupported-filter"; key: string }
    | { kind: "invalid-value"; key: string, value: unknown }
    | { kind: "encoding-failed"; reason: string }
    | { kind: "undefined-value"; key: string; value: unknown }

export interface AdapterResult<T> {
    result: T
    errors: AdapterError[]
}

export interface FilterAdapter<K extends Record<string, unknown>, Output> {
    encode(filterSet: FilterSet<K>): AdapterResult<Output>
}


export const tmdbMappingTypes = {
    "BOOLEAN": "boolean",
    "DATE": "date",
    "STRING": "string",
    "FLOAT": "float",
    "INTEGER": "integer"
} as const


export type TmdbBooleanMapping = {
    type: typeof tmdbMappingTypes.BOOLEAN;
    externalKey: string;
    allowedValues?: never;
    multi: false;
    join?: never;
};

export type TmdbValueMapping =
    & { externalKey: string }
    & (
        | { type: typeof tmdbMappingTypes.DATE; allowedValues: Date[] }
        | { type: typeof tmdbMappingTypes.STRING; allowedValues: string[] }
        | { type: typeof tmdbMappingTypes.INTEGER; allowedValues: number[] }
        | { type: typeof tmdbMappingTypes.FLOAT; allowedValues: number[] }
    )
    & (
        | { multi: false; join?: never }
        | { multi: true; join: { or: "|"; and: "," } }
    );

export type TmdbFilterMapping = TmdbBooleanMapping | TmdbValueMapping;


