import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
    selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

    protected elementRef: ElementRef = inject(ElementRef)

    appClickOutside = output<Event>()

    @HostListener('document:click', ['$event', '$event.target'])
    onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) return
        const clickedInside = this.elementRef.nativeElement.contains(targetElement)
        if (!clickedInside) this.appClickOutside.emit(event)
    }

}
