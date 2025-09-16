import { NgClass } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-expandable-multi-select',
    imports: [NgClass],
    templateUrl: './expandable-multi-select.component.html',
    styleUrl: './expandable-multi-select.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ExpandableMultiSelectComponent
        }
    ]
})
export class ExpandableMultiSelectComponent implements ControlValueAccessor {

    private SHOW_LESS = "show less"
    private SHOW_MORE = "show more"
    private LESS = 3

    protected formBuilder = inject(FormBuilder)
    multiSelectForm = this.formBuilder.group({
        selected: this.formBuilder.nonNullable.control<string[]>([])
    })

    protected showMore = signal(false)
    protected selectedSignal = toSignal(this.multiSelectForm.controls.selected.valueChanges, { initialValue: this.multiSelectForm.controls.selected.value })
    protected multiSelectState = computed<MultiSelectState>(() => {

        if (this.selectedSignal().length === this.options().length) return 'all'
        if (this.selectedSignal().length === 0) return 'none'
        return 'indeterminate'
    })
    protected showMoreDescription = computed(() => this.showMore() ? this.SHOW_LESS : this.SHOW_MORE)
    protected visibleOptions = computed(() => {
        return this.showMore() ? [...this.options()] : this.options().slice(0, this.LESS)
    })

    options = input.required<ExpandableSelectOption[]>()

    onChange: any
    onTouched: any

    get selected() {
        return this.multiSelectForm.value.selected
    }

    toggleShowMore(_: Event): void {
        this.showMore.set(!this.showMore())
    }

    handleClick(event: Event): void {
        const target = event.target as HTMLElement
        if (target.tagName !== "INPUT") return
        const value = target.getAttribute("value")
        if (!value) return
        const index: number = this.selected?.findIndex(elem => elem === value) ?? -1
        if (index === -1) {
            this.multiSelectForm.patchValue({ selected: [...(this.selected ?? []), value] })
        } else {
            this.selected?.splice(index, 1) ?? []
            this.multiSelectForm.patchValue({ selected: [...this.selected ?? []] })
        }
    }

    toggleSelectAll(_: Event): void {
        this.multiSelectForm.reset()
    }


    writeValue(selected: string[]): void {
        this.multiSelectForm.setValue({ selected: selected })
    }


    registerOnChange(onChange: any) {
        this.onChange = onChange
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    setDisabledState(isDisabled: boolean): void {

    }

}

type ExpandableSelectOption = { id: number, name: string }
type MultiSelectState = "none" | "indeterminate" | "all"
