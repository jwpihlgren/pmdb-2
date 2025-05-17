import { Directive, inject, input, Signal } from '@angular/core';
import { ResolveEnd, Router, RouterEvent } from '@angular/router';
import { AppEvent, AppEventService } from '../services/app-event.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Directive({
    selector: '[appAppEventTrigger]'
})
export class AppEventTriggerDirective {
    protected router: Router = inject(Router)
    protected eventService: AppEventService = inject(AppEventService)

    routerEvent: Signal<RouterEvent | undefined>

    constructor() {

        this.routerEvent = toSignal(this.router.events.pipe(
            map(event => {
                if (event instanceof ResolveEnd) {
                    this.eventService.emitEvent({type: "NAVIGATION", data: undefined})
                }
                return event as RouterEvent
            })
        ))
    }

}
