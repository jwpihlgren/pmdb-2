import { NgClass } from '@angular/common';
import { AfterViewInit, Component, input } from '@angular/core';
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
    params = input.required<ListboxParams>()
    multi = input(true)

    onChange = (selected: any) => { }

    onTouched = () => { }

    touched = false

    disabled = false

    onToggle(event: any) {
        const target = event.target as HTMLElement
        if (target.tagName !== "LI") return
        const value: string = target.getAttribute("data-value") || ""
        this.markAsTouched()
        if (this.disabled) return
        const indexOfValue = this.params().list.findIndex(item => {
            return item.value.toString() === value.toString()
        })
        if (this.multi()) {
            if (this.selected.includes(indexOfValue)) {
                this.selected = [...this.selected].filter(elem => elem !== indexOfValue)
            } else if (indexOfValue >= 0) {
                this.selected.push(indexOfValue)
            }
        } else {
            this.selected = [indexOfValue]
        }

        this.onChange(this.selected.map(index => this.params().list[index].value))
    }

    handleKeyup(event: KeyboardEvent): void {
        const target = event.target as HTMLElement
        if (target.tagName !== "LI") return
        if (event.key === " " || event.key === "Spacebar") {
            event.preventDefault()
            this.onToggle(event)
        }
    }

    writeValue(selected: number[] | number): void {
        if (selected === null) {
            this.selected = []
            return
        }
        if (typeof selected === "number") {
            this.selected = [selected]
            return
        }

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
