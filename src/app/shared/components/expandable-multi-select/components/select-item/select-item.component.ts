import { Component, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-select-item',
    imports: [],
    templateUrl: './select-item.component.html',
    styleUrl: './select-item.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: SelectItemComponent
        }
    ],
    host: {
        "[class.visible]": 'isVisible()'
    }
})
export class SelectItemComponent implements ControlValueAccessor {

    isSelected = signal(false)
    isVisible = signal(true)
    value = input.required<string>

    onChange!: () => {}
    onTouched!: () => {}

    writeValue(selected: boolean): void {
        this.isSelected.set(selected)
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    setSelected(state: boolean): void {
        this.isSelected.set(state)
    }

    setVisible(state: boolean): void {
        this.isVisible.set(state)
    }
}
