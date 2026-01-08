import { Component, contentChildren, input, reflectComponentType } from '@angular/core';
import { NgClass } from '@angular/common';
import { Closable } from '../../models/classes/closable.class';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FocusLostDirective } from '../../directives/focus-lost.directive';
import { DropdownListComponent } from '../drop-down-list/dropdown-list.component';
import { ComboboxItemComponent } from './components/combobox-item.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-combobox',
    imports: [NgClass, ClickOutsideDirective, FocusLostDirective, DropdownListComponent, ComboboxItemComponent],
    templateUrl: './combobox.component.html',
    styleUrl: './combobox.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ComboboxComponent
        }
    ],
    host: {
        '(click)': 'onClick($event)'
    }
})
export class ComboboxComponent extends Closable implements ControlValueAccessor {
    title = input.required<unknown>()
    multiSelect = input(false)
    selectableItems = contentChildren(ComboboxItemComponent)
    mirror = reflectComponentType(ComboboxItemComponent)
    selectedItems: string[] = []
    selectedItem: string | undefined = undefined

    private onChange: (value: any) => void = () => { }
    private onTouched: () => void = () => { }


    onClick(event: Event) {
        const target = event.target as HTMLElement
        if (target.localName === this.mirror?.selector) {
            const value = target.getAttribute("value") || "missing_on_attribute"
            const contentChild = this.selectableItems().find(c => c.value()?.toString() === value)
            if (!contentChild) return
            if (!this.selectableItems()) return
            if (contentChild.disabled()) return
            this.selectableItems().forEach(s => s.setSelected(false))
            if (!this.multiSelect()) {
                this.selectedItem = value
                this.selectableItems().find(s => s.value() === value)?.setSelected(true)
            }
            else {
                const index = this.selectedItems.findIndex(s => s === value)
                if (index > -1) {
                    this.selectedItems.splice(index, 1)
                } else {
                    this.selectedItems = [...this.selectedItems, value]
                }

                this.selectedItems.forEach(i => this.selectableItems().find(s => s.value() === i)?.setSelected(true))
            }
            this.onChange(this.multiSelect() ? this.selectedItems : this.selectedItem)
        }
    }

    reset(_: Event) {

        this.selectableItems().forEach(s => s.setSelected(false))
        if (this.multiSelect()) {
            this.selectedItems = []
            return
        } else {

            this.selectedItem = undefined
        }

        this.onChange(this.multiSelect() ? this.selectedItems : this.selectedItem)

    }

    writeValue(value: string | string[] | null): void {
        if (!this.selectableItems()) return;

        // Clear previous selection
        this.selectableItems().forEach(item => item.setSelected(false));

        if (value == null) {
            this.selectedItem = undefined;
            this.selectedItems = [];
            return;
        }

        if (this.multiSelect()) {
            this.selectedItems = Array.isArray(value) ? value : [value];

            this.selectedItems.forEach(v =>
                this.selectableItems()
                    .find(item => item.value()?.toString() === v)
                    ?.setSelected(true)
            );
        } else {
            this.selectedItem = Array.isArray(value) ? value[0] : value;

            this.selectableItems()
                .find(item => item.value()?.toString() === this.selectedItem)
                ?.setSelected(true);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {

    }
}



