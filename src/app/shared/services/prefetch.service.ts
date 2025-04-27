import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PrefetchService<T> {

    private prefetchSubject: Subject<T> = new Subject()
    private intentTimeout: any
    private intentId: T | undefined

    prefetch$: Observable<T>

    constructor() {
        this.prefetch$ = this.prefetchSubject.asObservable()   }

    startIntent(id: T) {
        this.intentId = id
        this.intentTimeout = setTimeout(() => {
            if (this.intentId === id) this.prefetchSubject.next(id)
            this.intentId = undefined
        }, 400)
    }

    clearIntent() {
        this.intentId = undefined
        clearTimeout(this.intentTimeout)
    }
}
