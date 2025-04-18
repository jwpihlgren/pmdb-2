import { Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Closable } from '../../models/classes/closable.class';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FocusLostDirective } from '../../directives/focus-lost.directive';

@Component({
    selector: 'app-combobox',
    imports: [NgClass, ClickOutsideDirective, FocusLostDirective],
    templateUrl: './combobox.component.html',
    styleUrl: './combobox.component.css',
})
export class ComboboxComponent extends Closable {
    title: InputSignal<any> = input.required()

    test(): void {
        console.log("parent")
    }
}
