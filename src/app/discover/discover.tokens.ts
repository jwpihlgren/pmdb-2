import { InjectionToken } from "@angular/core"
import { QueryObjectStatic } from "./query-object.interface"
import { Observable } from "rxjs"

export const QUERY_FACTORY = new InjectionToken<QueryObjectStatic<any>>('QUERY_FACTORY')
export const DISCOVER_SOURCE = new InjectionToken<(query: any) => Observable<any>>('DISCOVER_SOURCE')

