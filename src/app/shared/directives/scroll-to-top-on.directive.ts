import { Directive, ElementRef, inject, Injector, Input, OnInit, runInInjectionContext, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';

@Directive({
    selector: '[appScrollToTopOn]'
})
export class ScrollToTopOnDirective implements OnInit {

    elementRef: ElementRef<HTMLElement> = inject(ElementRef)
    @Input({ required: true }) appScrollToTopOn!: Observable<any>
    private observedEvent!: Signal<any>
    private readonly injector = inject(Injector)

    ngOnInit(): void {
        runInInjectionContext(this.injector, () => {
            this.observedEvent = toSignal(
                this.appScrollToTopOn.pipe(
                    tap(() => {
                        this.elementRef.nativeElement.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                    })
                ),
                { initialValue: null }
            );
        });
    }
}
