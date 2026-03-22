import { QueryViolation } from "./query-object.interface"

interface validationContext {
    key: string,
    violations: QueryViolation[]
}

export function validId(value: unknown, ctx: validationContext): number | null {
    const num = Number(value)
    if (!Number.isInteger(num)) {
        ctx.violations.push({ field: ctx.key, reason: "Must be a whole number", value: String(value) })
        return null
    }
    return num
}


export function validDate(value: unknown, ctx: validationContext): Date | null {
    const date = new Date(String(value))
    if (isNaN(date.getTime())) {
        ctx.violations.push({ field: ctx.key, reason: "Must be a date", value: String(value) })
        return null
    }
    return date

}

export function validBoolean(value: unknown, ctx: validationContext): boolean {
    const bool = String(value)
    if (bool === "true") return true
    if (bool === "false") return false
    ctx.violations.push({ field: ctx.key, reason: "Must be true/false", value: String(value) })
    return false
}

export function validVote(value: unknown, ctx: validationContext): number | null {
    const MIN_VOTE_NUMBER = 0
    const MAX_VOTE_NUMBER = 0

    const num = Number(value)
    if (isNaN(num)) {
        ctx.violations.push({ field: ctx.key, reason: "Must be numeric", value: String(value) })
        return null
    }
    if (num < MIN_VOTE_NUMBER) {
        ctx.violations.push({ field: ctx.key, reason: `Must be greater than or equal to ${MIN_VOTE_NUMBER}`, value: String(value) })
        return null
    }
    if (num > MAX_VOTE_NUMBER) {
        ctx.violations.push({ field: ctx.key, reason: `Must be less than or equal to ${MAX_VOTE_NUMBER}`, value: String(value) })
        return null
    }
    return num
}

export function validOption<T extends string>(value: unknown, validOptions: readonly T[], ctx: validationContext): T | null {
    const option = String(value)
    if (!(validOptions as readonly string[]).includes(option)) {
        ctx.violations.push({
            field: ctx.key,
            reason: `${option} is not one of [${validOptions.join(", ")}]`,
            value: option
        })
        return null
    }
    return option as T
}


export function resolveConflict<T>(
    params: Partial<T>,
    preferredKey: keyof T,
    rejectedKey: keyof T,
    ctx: validationContext
): Partial<T> {
    const preferred = params[preferredKey];
    const rejected = params[rejectedKey];

    if (!Array.isArray(preferred) || !Array.isArray(rejected)) return params;
    if (!preferred.length) return params;

    ctx.violations.push(
        {
            field: String(rejectedKey),
            reason: `Conflicting usage of ${String(preferredKey)} and ${String(rejectedKey)}. Keeping ${String(preferredKey)}`,
            value: ""
        })
    return { ...params, [rejectedKey]: [] };
}
