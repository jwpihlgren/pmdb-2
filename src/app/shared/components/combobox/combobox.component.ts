import { Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Closable } from '../../models/classes/closable.class';

@Component({
    selector: 'app-combobox',
    imports: [NgClass],
    templateUrl: './combobox.component.html',
    styleUrl: './combobox.component.css',
})
export class ComboboxComponent extends Closable {
    title: InputSignal<any> = input.required()
}
