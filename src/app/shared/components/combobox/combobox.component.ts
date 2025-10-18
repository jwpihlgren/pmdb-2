import { Component, contentChildren, input, reflectComponentType } from '@angular/core';
import { NgClass } from '@angular/common';
import { Closable } from '../../models/classes/closable.class';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FocusLostDirective } from '../../directives/focus-lost.directive';
import { DropdownListComponent } from '../drop-down-list/dropdown-list.component';
import { ComboboxItemComponent } from './components/combobox-item.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Selectable } from '../../models/interfaces/selectable';

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
    selectedItems: Selectable[] = []
    selectedItem: Selectable | undefined = undefined

    private onChange: (value: any) => void = () => { }
    private onTouched: () => void = () => { }


    onClick(event: Event) {
        const target = event.target as HTMLElement
        if (target.localName === this.mirror?.selector) {
            const name = target.innerText
            const value = target.getAttribute("value") || "missing_on_attribute"
            const selectable = { name: name, value: value }
            const contentChild = this.selectableItems().find(c => c.value()?.toString() === value)
            if (!contentChild) return
            if (!this.selectableItems()) return
            if (contentChild.disabled()) return
            this.selectableItems().forEach(s => s.setSelected(false))
            if (!this.multiSelect()) {
                this.selectedItem = selectable
                this.selectableItems().find(s => s.value() === value)?.setSelected(true)
            }
            else {
                const index = this.selectedItems.findIndex(s => s.value === value)
                if (index > -1) {
                    this.selectedItems.splice(index, 1)
                } else {
                    this.selectedItems = [...this.selectedItems, selectable]
                }

                this.selectedItems.forEach(i => this.selectableItems().find(s => s.value() === i.value)?.setSelected(true))
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

        this.onChange(this.multiSelect() ? this.selectedItem : this.selectedItem)

    }

    writeValue(selectedItems: Selectable[]): void {
        this.selectedItems = selectedItems
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {

    }


}



