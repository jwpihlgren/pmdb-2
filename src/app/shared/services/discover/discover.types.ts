import { HttpParams } from "@angular/common/http"
import { FormGroup } from "@angular/forms"
import { ActivatedRouteSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { FormValues } from "../../adapters/filterForm/filterForm.adapter"
import { FilterSet } from "../../models/filter.model"
import { Pagination } from "../../models/interfaces/pagination"

export interface DiscoverResult<T> { result: T[], pagination: Pagination }
export interface DiscoverService<K extends Record<string, unknown>, T> {
    readonly filters: Observable<FilterSet<K>>
    results: Observable<DiscoverResult<T>>
    setFilters(formValues: FormValues<K>): void
    adoptFromUrl(snapshort: ActivatedRouteSnapshot, form: FormGroup): void
}

export interface DiscoverRequestStrategy<TEncoded, TResult> {
    endpoint: string
    toHttpParams(encoded: TEncoded
    ): HttpParams
    execute$(endpointUrl: URL, params: HttpParams): Observable<DiscoverResult<TResult>>
}


