import { NgClass } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-listbox',
    imports: [NgClass],
    templateUrl: './listbox.component.html',
    styleUrl: './listbox.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ListboxComponent
        }
    ]
})
export class ListboxComponent implements ControlValueAccessor {
    selected: number[] = []
    params: InputSignal<ListboxParams> = input.required()

    onChange = (selected: any) => { }

    onTouched = () => { }

    touched = false

    disabled = false

    onToggle(event: Event) {
        const target = event.target as HTMLElement
        const value: string = target.getAttribute("data-value") || ""
        this.markAsTouched()
        if (this.disabled) return
        const indexOfValue = this.params().list.findIndex(item =>  {
            return item.value.toString() === value.toString()
        })
        if (this.selected.includes(indexOfValue)) {
            this.selected = [...this.selected].filter(elem => elem !== indexOfValue)
        } else if(indexOfValue >= 0) {
            this.selected.push(indexOfValue)
        }
        this.onChange(this.selected)
    }

    writeValue(selected: number[]): void {
        this.selected = selected
    }

    registerOnChange(onChange: any) {
        this.onChange = onChange
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched()
            this.touched = true
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
    }
}


export interface ListboxParams {
    list: {
        name: string
        value: number | string
    }[]
}
