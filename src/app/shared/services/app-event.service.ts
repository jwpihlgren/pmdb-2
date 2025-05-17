import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppEventService {

    private appEventSubject: Subject<AppEvent> = new Subject<any>
    appEvent$: Observable<AppEvent> = this.appEventSubject.asObservable()

    constructor() { }

    emitEvent(event: AppEvent): void {
        this.appEventSubject.next(event)
    }
}

type AppEventType = "PAGINATION" | "NAVIGATION"

export interface AppEvent {
    type: AppEventType,
    data: any
}
