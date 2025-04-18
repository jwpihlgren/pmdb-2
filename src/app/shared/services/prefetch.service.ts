import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PrefetchService<T> {

    private prefetchSubject: Subject<T> = new Subject()
    private intentTimeout: any
    private intendId: T | undefined

    prefetch$: Observable<T>

    constructor() {
        this.prefetch$ = this.prefetchSubject.asObservable()   }

    startIntent(id: T) {
        this.intendId = id
        this.intentTimeout = setTimeout(() => {
            if (this.intendId === id) this.prefetchSubject.next(id)
            this.intendId = undefined
        }, 400)
    }

    clearIntent() {
        this.intendId = undefined
        clearTimeout(this.intentTimeout)
    }
}
