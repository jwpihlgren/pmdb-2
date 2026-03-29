import { inject, Injectable } from '@angular/core';
import { QueryObject, QueryObjectStatic } from './query-object.interface';
import { distinctUntilChanged, map, Observable, shareReplay, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DISCOVER_SOURCE, QUERY_FACTORY } from './discover.tokens';


@Injectable()
export class DiscoverStateService<T extends QueryObject<T>, R> {

    private route = inject(ActivatedRoute)
    private router = inject(Router)
    private factory = inject<QueryObjectStatic<T>>(QUERY_FACTORY)
    private source = inject<(query: T) => Observable<R>>(DISCOVER_SOURCE)

    private readonly parse$ = this.route.queryParams.pipe(
        map(params => this.factory.fromParams(params)),
        shareReplay(1)
    )

    readonly query$ = this.parse$.pipe(
        map(result => result.query),
        distinctUntilChanged(this.isEqual),
        shareReplay(1)
    )

    readonly violations$ = this.parse$.pipe(
        map(result => result.violations)
    )

    readonly result$ = this.query$.pipe(
        switchMap(query => this.source(query)),
        shareReplay(1)
    )

    update(partial: Partial<T>): void {
        this.query$.pipe(
            take(1)
        ).subscribe(current => {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: current.with(partial).toParams()
            })
        })
    }

    private isEqual(a: T, b: T) {
        return JSON.stringify(a.toParams()) === JSON.stringify(b.toParams())
    }
}
