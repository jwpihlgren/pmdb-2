import { Directive, ElementRef, inject, Injector, Input, OnInit, runInInjectionContext, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';
import { AppEvent } from '../services/app-event.service';

@Directive({
    selector: '[appScrollToTopOn]'
})
export class ScrollToTopOnDirective implements OnInit {

    elementRef: ElementRef<HTMLElement> = inject(ElementRef)
    @Input({ required: true }) appScrollToTopOn!: Observable<AppEvent>
    private observedEvent!: Signal<AppEvent | null>
    private readonly injector = inject(Injector)

    ngOnInit(): void {
        runInInjectionContext(this.injector, () => {
            this.observedEvent = toSignal(
                this.appScrollToTopOn.pipe(
                    tap((event) => {
                        const scrollBehavior = event.type === "PAGINATION" ? "smooth" : "instant"
                        console.log(event)
                        this.elementRef.nativeElement.scrollTo({
                            top: 0,
                            behavior: scrollBehavior,
                        });
                    })
                ),
                { initialValue: null }
            );
        });
    }
}
