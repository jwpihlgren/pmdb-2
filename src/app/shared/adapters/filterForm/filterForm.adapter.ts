import { FormGroup } from "@angular/forms";
import { Filter, FilterDefinitions, FilterSet, FilterValueDelimiter, filterTypes } from "../../models/filter.model";

export type FormValues<T> = {
    [K in keyof T]: any
};

export class FilterFormAdapter<K extends Record<string, Filter | undefined>> {
    constructor(private definitions: FilterDefinitions<K>) { }

    decode(formValue: Record<string, any>): FilterSet<K> {
        const result = {} as FilterSet<K>;

        for (const key of Object.keys(formValue)) {
            const controlValue = formValue[key];
            const definition = this.definitions.filters[key as keyof K];

            if (!definition) {
                result[key as keyof K] = undefined;
                continue;
            }

            // Grouped filter
            if (this.isGroupedFilter(controlValue)) {
                const values = this.normalizeArray(controlValue.values);
                if (values.length === 0) {
                    result[key as keyof K] = undefined;
                    continue;
                }

                result[key as keyof K] = {
                    type: definition.type,
                    values: values.map(v => String(v)),
                    operator: controlValue.operator
                } as Filter;

                continue;
            }

            // Scalar filter
            const scalar = this.normalizeScalar(controlValue, definition.type);
            if (scalar === undefined) {
                result[key as keyof K] = undefined;
                continue;
            }

            result[key as keyof K] = {
                type: definition.type,
                values: [String(scalar)],
                operator: undefined
            } as Filter;
        }

        return result;
    }

    encode(filterSet: FilterSet<K>, form: FormGroup): void {
        const patch: Record<string, any> = {};

        for (const key of Object.keys(filterSet)) {
            const filter = filterSet[key as keyof K];
            const def = this.definitions.filters[key as keyof K];

            if (!filter) {
                // Checkbox UI expects boolean false when not set
                if (def?.type === filterTypes.BOOLEAN) patch[key] = false;
                else patch[key] = null;
                continue;
            }

            // Multi-value
            if (this.hasOperator(filter)) {
                patch[key] = {
                    values: filter.values,
                    operator: filter.operator
                };
                continue;
            }

            // Scalar: decode from string token into UI-friendly value
            patch[key] = this.toFormScalar(def?.type, filter.values[0]);
        }

        form.patchValue(patch, { emitEvent: false });
    }

    private toFormScalar(type: string | undefined, token: string | undefined): any {
        if (token === undefined || token === null) return null;

        switch (type) {
            case filterTypes.BOOLEAN:
                // checkbox expects boolean
                return token === "true";
            case filterTypes.NUMBER:
                // keep number for numeric inputs; if you prefer string, return token
                return Number(token);
            case filterTypes.DATE:
                // keep as string for date inputs (YYYY-MM-DD)
                return token;
            case filterTypes.STRING:
            default:
                return token;
        }
    }

    private normalizeScalar(value: any, type: string): any | undefined {
        if (value === null || value === undefined) return undefined;
        if (typeof value === "string" && value.trim() === "") return undefined;

        // Checkbox rule: false means "unset" (never encode false)
        if (type === filterTypes.BOOLEAN && value === false) return undefined;

        return value;
    }

    private normalizeArray(values: any[]): any[] {
        if (!Array.isArray(values)) return [];
        return values
            .filter(v => v !== null && v !== undefined)
            .map(v => typeof v === "string" ? v.trim() : v)
            .filter(v => !(typeof v === "string" && v === ""));
    }

    private isGroupedFilter(value: any): value is { values: unknown[]; operator?: FilterValueDelimiter } {
        return typeof value === "object" && value !== null && Array.isArray(value.values);
    }

    private hasOperator(filter: Filter): boolean {
        return Array.isArray(filter.values) && filter.operator != null;
    }
}

