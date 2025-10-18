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
        "[class.visible]": 'isVisible()',
        "(click)": "onClick()"
    }
})
export class SelectItemComponent implements ControlValueAccessor {

    isSelected = signal(false)
    isVisible = signal(false)
    value = input.required<string>


    onChange: (state: boolean) => void = () => { }
    onTouched: any = () => { }

    writeValue(selected: boolean): void {
        this.isSelected.set(selected)
        this.onChange(this.isSelected())
    }

    registerOnChange(fn: (state: boolean) => void): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    setSelected(state: boolean): void {
        this.isSelected.set(state)
        this.onChange(this.isSelected())
    }

    setVisible(state: boolean): void {
        this.isVisible.set(state)
    }

    private onClick() {
        this.setSelected(!this.isSelected())
        this.onChange(this.isSelected())
    }

}
