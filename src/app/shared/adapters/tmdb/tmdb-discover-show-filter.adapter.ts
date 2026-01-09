import { FilterSet, Filter } from "../../models/filter.model";
import { DiscoverShowFilters } from "../../services/discover/show/discover-show-filters.interface";
import { AdapterError, AdapterResult, FilterAdapter, TmdbFilterMapping, tmdbMappingTypes } from "./tmdb-filter-adapter.types";

export class TmdbDiscoverShowAdapter implements FilterAdapter<DiscoverShowFilters, Record<string, string>> {

    private readonly mapping: Record<keyof DiscoverShowFilters, TmdbFilterMapping> = {
        withGenres: {
            externalKey: "with_genres",
            type: tmdbMappingTypes.STRING,
            multi: true,
            join: { and: ",", or: "|" },
            allowedValues: []
        },
        withKeywords: {
            externalKey: "with_keywords",
            type: tmdbMappingTypes.STRING,
            multi: true,
            join: { and: ",", or: "|" },
            allowedValues: []
        },
        withPeople: {
            externalKey: "with_people",
            type: tmdbMappingTypes.STRING,
            multi: true,
            join: { and: ",", or: "|" },
            allowedValues: []
        },
        includeVideo: { type: tmdbMappingTypes.BOOLEAN, externalKey: "include_video", multi: false },
        includeAdult: { type: tmdbMappingTypes.BOOLEAN, externalKey: "include_adult", multi: false },
        firstAirDateGte: { type: tmdbMappingTypes.DATE, externalKey: "release_date.gte", multi: false, allowedValues: [] },
        firstAirDateLte: { type: tmdbMappingTypes.DATE, externalKey: "release_date.lte", multi: false, allowedValues: [] },
        voteAverageGte: { type: tmdbMappingTypes.FLOAT, externalKey: "vote_average.gte", multi: false, allowedValues: [] },
        voteAverageLte: { type: tmdbMappingTypes.FLOAT, externalKey: "vote_average.lte", multi: false, allowedValues: [] },
        sortBy: {
            type: tmdbMappingTypes.STRING,
            externalKey: "sort_by",
            multi: false,
            allowedValues: [
                "original_title.asc",
                "original_title.desc",
                "popularity.asc",
                "popularity.desc",
                "revenue.asc",
                "revenue.desc",
                "primary_release_date.asc",
                "title.asc",
                "title.desc",
                "primary_release_date.desc",
                "vote_average.asc",
                "vote_average.desc",
                "vote_count.asc",
                "vote_count.desc"
            ]
        },

        page: { type: tmdbMappingTypes.INTEGER, externalKey: "page", multi: false, allowedValues: [] }
    } as const;

    encode(filterSet: FilterSet<DiscoverShowFilters>): AdapterResult<Record<string, string>> {
        const result: Record<string, string> = {};
        const errors: AdapterError[] = [];

        for (const key in filterSet) {
            const filter = filterSet[key as keyof DiscoverShowFilters];
            if (!filter) continue;

            if (!(key in this.mapping)) {
                errors.push({ kind: "unsupported-filter", key });
                continue;
            }

            const mapped = this.mapping[key as keyof DiscoverShowFilters];

            // Validate + normalize string tokens for the mapped type
            const normalized = this.normalizeTokensForType(mapped.type, filter.values);
            if (!normalized.ok) {
                errors.push({ kind: "invalid-value", key, value: filter.values });
                continue;
            }

            const allowedSet = this.getAllowedSetAsStrings(mapped);
            if (allowedSet) {
                const filtered = normalized.values.filter(v => allowedSet.has(v));
                if (filtered.length === 0) {
                    errors.push({ kind: "invalid-value", key, value: filter.values });
                    continue;
                }
                normalized.values = filtered;
            }

            const encodedValue = this.encodeValues(mapped, { ...filter, values: normalized.values });
            result[mapped.externalKey] = encodedValue;
        }

        return { result, errors };
    }

    private encodeValues(mapped: TmdbFilterMapping, filter: Filter): string {
        const { values, operator } = filter;

        if (!mapped.multi) {
            return values[0];
        }

        const joinChar = operator === "or" ? mapped.join.or : mapped.join.and;
        return values.join(joinChar);
    }

    private normalizeTokensForType(
        type: string,
        values: string[]
    ): { ok: true; values: string[] } | { ok: false } {
        const tokens = (values ?? [])
            .filter(v => v !== null && v !== undefined)
            .map(v => String(v).trim())
            .filter(v => v !== "" && v !== "undefined" && v !== "null");

        if (tokens.length === 0) return { ok: false };

        switch (type) {
            case tmdbMappingTypes.BOOLEAN: {
                // Accept both "true/false" and "True/False" by normalizing
                const norm = tokens.map(t => t.toLowerCase());
                if (!norm.every(t => t === "true" || t === "false")) return { ok: false };
                return { ok: true, values: norm };
            }

            case tmdbMappingTypes.INTEGER: {
                const nums = tokens.map(t => Number(t));
                if (nums.some(n => Number.isNaN(n) || !Number.isInteger(n))) return { ok: false };
                return { ok: true, values: nums.map(n => String(n)) };
            }

            case tmdbMappingTypes.FLOAT: {
                const nums = tokens.map(t => Number(t));
                if (nums.some(n => Number.isNaN(n))) return { ok: false };
                return { ok: true, values: nums.map(n => String(n)) };
            }

            case tmdbMappingTypes.DATE: {
                // Normalize anything parseable to YYYY-MM-DD
                const dates = tokens.map(t => {
                    const d = new Date(t);
                    if (Number.isNaN(d.getTime())) return null;
                    return d.toISOString().split("T")[0];
                });
                if (dates.some(d => d === null)) return { ok: false };
                return { ok: true, values: dates as string[] };
            }

            case tmdbMappingTypes.STRING:
            default:
                return { ok: true, values: tokens };
        }
    }
    private getAllowedSetAsStrings(mapped: TmdbFilterMapping): Set<string> | null {
        // Boolean mappings explicitly have no allowedValues
        if (mapped.type === tmdbMappingTypes.BOOLEAN) return null;

        // If empty -> no restriction
        if (!mapped.allowedValues || mapped.allowedValues.length === 0) return null;

        switch (mapped.type) {
            case tmdbMappingTypes.STRING: {
                // allowedValues: string[]
                return new Set(mapped.allowedValues.map(v => String(v).trim()));
            }

            case tmdbMappingTypes.INTEGER:
            case tmdbMappingTypes.FLOAT: {
                // allowedValues: number[]
                // Use same string form we use for normalized.values (String(Number(x)))
                return new Set(mapped.allowedValues.map(n => String(n)));
            }

            case tmdbMappingTypes.DATE: {
                // allowedValues: Date[]
                // Normalize to YYYY-MM-DD to match your date normalization
                return new Set(mapped.allowedValues.map(d => d.toISOString().split("T")[0]));
            }

            default:
                return null;
        }
    }
}

