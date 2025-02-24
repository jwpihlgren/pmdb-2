import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: '[appFocusLost]'
})
export class FocusLostDirective {
    protected elementRef: ElementRef = inject(ElementRef)

    appFocusLost = output<Event>()

    @HostListener('focusout', ['$event', '$event.relatedTarget'])
    onFocusOut(event: FocusEvent, relatedTarget: HTMLElement): void {
        if(!relatedTarget) {
            this.appFocusLost.emit(event)
        }

        const focusedInside = this.elementRef.nativeElement.contains(relatedTarget)
        if(!focusedInside) this.appFocusLost.emit(event)
    }


}
