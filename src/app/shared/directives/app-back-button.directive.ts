import { Location } from '@angular/common';
import { Directive, inject } from '@angular/core';

@Directive({
    selector: '[appBackButton]',
    host: {
        '(click)': 'onClick($event)'
    }
})
export class AppBackButtonDirective {
    private location = inject(Location)
    constructor() { }

    onClick(event: Event): void {
        event.preventDefault()
        this.location.back()
    }

}
