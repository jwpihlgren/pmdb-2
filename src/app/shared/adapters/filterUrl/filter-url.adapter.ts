import { ParamMap } from "@angular/router";
import {
    Filter,
    FilterDefinitions,
    FilterDefinition,
    FilterSet,
    FilterValueDelimiter,
    filterTypes,
    filterValueOperator
} from "../../models/filter.model";

export interface ParamMapToFilterSetResponse<K extends Record<string, unknown>> {
    filterSet: FilterSet<K>;
    structuralErrors: string[];
    semanticErrors: string[];
}

export class FilterUrlAdapter {
    static encode<K extends Record<string, unknown>>(
        filterSet: FilterSet<K>
    ): Record<string, string | string[]> {
        const params: Record<string, string | string[]> = {};

        for (const key of Object.keys(filterSet) as Array<keyof K>) {
            const filter = filterSet[key];
            if (!filter) continue;

            const cleaned = (filter.values ?? [])
                .filter(v => v !== null && v !== undefined)
                .map(v => String(v).trim())
                .filter(v => v !== "" && v !== "undefined" && v !== "null");

            if (cleaned.length === 0) continue;

            const paramKey = filter.operator ? `${String(key)}.${filter.operator}` : String(key);

            params[paramKey] = cleaned.length === 1 ? cleaned[0] : cleaned;
        }

        return params;
    }

    static decode<K extends Record<string, unknown>>(
        map: ParamMap,
        filterDefinitions: FilterDefinitions<K>,
        base: FilterSet<K>
    ): ParamMapToFilterSetResponse<K> {
        const structuralErrors: string[] = [];
        const semanticErrors: string[] = [];

        const validParamKeys = map.keys.filter(k => {
            const baseKey = k.split(".")[0] as keyof K;
            return baseKey in base;
        });

        for (const paramKey of validParamKeys) {
            const [rawKey, rawOp] = paramKey.split(".");
            const key = rawKey as keyof K;

            const def = filterDefinitions.filters[key];
            if (!def) {
                structuralErrors.push(`Unknown filter key: ${String(key)}`);
                continue;
            }

            const op = this.parseOperator(rawOp);
            const rawValues = map.getAll(paramKey);

            const sanitized = this.sanitizeValues(rawValues, def);
            structuralErrors.push(...sanitized.errors);

            if (sanitized.values.length === 0) continue;

            const existing = base[key];

            if (!existing) {
                base[key] = {
                    type: def.type,
                    operator: op,
                    values: sanitized.values
                } as Filter;
                continue;
            }

            if ((existing.operator ?? undefined) !== (op ?? undefined)) {
                semanticErrors.push(
                    `filter: ${String(key)} cannot have more than one operator. Using the first one: ${String(existing.operator)}`
                );
            }

            base[key] = {
                type: existing.type,
                operator: existing.operator,
                values: [...existing.values, ...sanitized.values]
            } as Filter;
        }

        return { filterSet: base, structuralErrors, semanticErrors };
    }

    private static parseOperator(raw?: string): FilterValueDelimiter | undefined {
        if (!raw) return undefined;
        return raw in filterValueOperator ? (raw as FilterValueDelimiter) : undefined;
    }

    private static sanitizeValues(values: string[], def: FilterDefinition): { values: string[]; errors: string[] } {
        const errors: string[] = [];

        let tmp = (values ?? [])
            .filter(v => v !== null && v !== undefined)
            .map(v => String(v).trim())
            .filter(v => v !== "" && v !== "undefined" && v !== "null");

        tmp = tmp.filter(v => {
            switch (def.type) {
                case filterTypes.STRING:
                    return true;
                case filterTypes.BOOLEAN:
                    return v === "true" || v === "false";
                case filterTypes.NUMBER:
                    return !Number.isNaN(Number(v));
                case filterTypes.DATE:
                    return !Number.isNaN(Date.parse(v));
                default:
                    errors.push(`filterType: ${String(def.type)} is not recognized`);
                    return false;
            }
        });

        // Early restriction (TMDB/domain constraint)
        if (def.allowedValues && def.allowedValues.length > 0) {
            const allowed = new Set(def.allowedValues);
            tmp = tmp.filter(v => allowed.has(v));
        }

        return { values: tmp, errors };
    }
}

