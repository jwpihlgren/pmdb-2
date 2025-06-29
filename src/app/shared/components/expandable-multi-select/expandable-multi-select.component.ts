import { NgClass } from '@angular/common';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class ExpandableMultiSelectComponent implements ControlValueAccessor, OnInit {

    private MAX_WHEN_HIDDEN = 3
    private SHOW_LESS = "show less"
    private SHOW_MORE = "show more"

    protected formBuilder = inject(FormBuilder)
    protected showMore = signal(false)
    protected multiSelectState = signal<MultiSelectState>("none")
    protected showMoreDescription = computed(() => this.showMore() ? this.SHOW_LESS : this.SHOW_MORE)

    options = input.required<ExpandableSelectOption[]>()
    multiSelectForm = this.formBuilder.group({
        selected: [[] as string[]]
    })

    get selected() {
        return this.multiSelectForm.value.selected
    }

    constructor() {
    }

    ngOnInit(): void { }

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

    registerOnChange(fn: any): void {

    }

    registerOnTouched(fn: any): void {

    }

    setDisabledState(isDisabled: boolean): void {

    }

}

type ExpandableSelectOption = { id: number, name: string }
type MultiSelectState = "none" | "indeterminate" | "all"
