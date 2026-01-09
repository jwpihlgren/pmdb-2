import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRouteSnapshot, UrlTree } from "@angular/router";
import { BehaviorSubject, Observable, Subject, take } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { FilterFormAdapter, FormValues } from "../../adapters/filterForm/filterForm.adapter";
import { FilterUrlAdapter } from "../../adapters/filterUrl/filter-url.adapter";
import { FilterAdapter } from "../../adapters/tmdb/tmdb-filter-adapter.types";
import { FilterSet, FilterDefinitions, Filter, FilterValueDelimiter, FilterDefinition } from "../../models/filter.model";
import { DiscoverService, DiscoverRequestStrategy, DiscoverResult } from "./discover.types";

export abstract class DiscoverBaseService<K extends Record<string, unknown>, T> implements DiscoverService<K, T> {
    private readonly filters_: BehaviorSubject<FilterSet<K>>;
    readonly filters: Observable<FilterSet<K>>;

    protected abstract readonly definitions: FilterDefinitions<K>
    protected abstract filterFormAdapter: FilterFormAdapter<Record<keyof K, Filter | undefined>>
    protected abstract requestStrategy: DiscoverRequestStrategy<Record<string, string>, T>
    protected abstract http: HttpClient

    protected results$: Subject<DiscoverResult<T>> = new Subject()
    private router = inject<Router>(Router)

    constructor(
        protected readonly filterSetKeys: Record<string, string>,
        protected externalAdapter: FilterAdapter<K, Record<string, string>>
    ) {
        const initial = this.createFilterSet(filterSetKeys);
        this.filters_ = new BehaviorSubject<FilterSet<K>>(initial);
        this.filters = this.filters_.asObservable();
    }

    get results(): Observable<DiscoverResult<T>> {
        return this.results$.asObservable()
    }

    setFilters(formValues: FormValues<K>): void {
        const filterSet = this.filterFormAdapter.decode(formValues);

        const queryParams = FilterUrlAdapter.encode(filterSet);
        this.router.navigate([], { queryParams });
    }

    adoptFromUrl(route: ActivatedRouteSnapshot, form: FormGroup): void {
        const paramMap = route.queryParamMap;
        if (!paramMap) return;

        const newEmptyFilterSet = this.createFilterSet(this.filterSetKeys);
        const parseResult = FilterUrlAdapter.decode(paramMap, this.definitions, newEmptyFilterSet);

        if (parseResult.structuralErrors.length > 0) {
            this.router.navigate([], {
                queryParams: FilterUrlAdapter.encode(this.createFilterSet(this.filterSetKeys)),
                replaceUrl: true
            });
            return;
        }
        const filterSet = parseResult.filterSet;

        this.filters_.next(filterSet);

        this.filterFormAdapter.encode(filterSet, form);

        this.request(filterSet);
    }

    protected createFilterSet(keys: Record<string, string>): FilterSet<K> {
        return Object
            .fromEntries(Object.keys(keys).map(k => [k, undefined])) as FilterSet<K>;
    }

    private request(filterSet: FilterSet<K>): void {
        const { result, errors } = this.externalAdapter.encode(filterSet);
        if (errors.length) {
            console.warn(errors);
            return;
        }

        const url = new URL(this.requestStrategy.endpoint, environment.tmdbApiUrl);

        let params = this.requestStrategy.toHttpParams(result).set("api_key", environment.tmdbApiKey);

        this.requestStrategy.execute$(url, params)
            .pipe(take(1))
            .subscribe(res => this.results$.next(
                {
                    pagination: res.pagination,
                    result: res.result
                }
            ));
    }
}



export interface DiscoverQueryBuilderBuildResult { url: string[], queryParams: Record<string, string | string[]> }

export interface DiscoverQueryBuilder<T extends Record<string, unknown>> {
    create(url: string[], newEmptyFilterSet: FilterSet<T>, filterDefitions: FilterDefinitions<T>): this
    with<K extends keyof T>(key: K, value: T[K]): this;
    build(): DiscoverQueryBuilderBuildResult
    buildUrlTree(router: Router): UrlTree
}

type FilterMap<K extends Record<string, unknown>> =
    Record<keyof K, FilterDefinition>;

type FilterDefinitionsOf<K extends Record<string, unknown>, F extends FilterMap<K>> = {
    readonly filters: F;
};

export type WithInputForDef<D extends FilterDefinition> =
    D["multi"] extends true
    ? { values: string[]; operator?: FilterValueDelimiter }
    : { value: string };


export type WithInput<
    K extends Record<string, unknown>,
    Key extends keyof K,
    F extends FilterMap<K>
> = WithInputForDef<F[Key]>;



export abstract class DiscoverBaseQueryBuilder<
    K extends Record<string, unknown>,
    F extends FilterMap<K>
> {
    protected constructor(
        protected url: string[],
        protected filterSet: FilterSet<K>,
        protected definitions: FilterDefinitionsOf<K, F>
    ) { }

    with<Key extends keyof K>(key: Key, input: WithInput<K, Key, F>): this {
        const def = this.definitions.filters[key];

        const filter: Filter = def.multi
            ? {
                type: def.type,
                values: (input as { values: string[] }).values,
                operator: (input as { operator?: FilterValueDelimiter }).operator ?? "and",
            }
            : {
                type: def.type,
                values: [(input as { value: string }).value],
                operator: undefined,
            };

        this.filterSet[key] = filter;
        return this;
    }

    build(): DiscoverQueryBuilderBuildResult {
        const encoded = FilterUrlAdapter.encode(this.filterSet);
        return { url: this.url, queryParams: encoded };
    }

    buildUrlTree(router: Router): UrlTree {
        const encoded = FilterUrlAdapter.encode(this.filterSet);
        return router.createUrlTree(this.url, { queryParams: encoded })

    }
}





