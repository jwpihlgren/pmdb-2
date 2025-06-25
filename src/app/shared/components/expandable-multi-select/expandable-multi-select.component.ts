import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-expandable-multi-select',
    imports: [],
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
    private SELECT_ALL = "select all"
    private DESELECT_ALL = "deselect all"

    protected formBuilder = inject(FormBuilder)
    protected showMore = signal(false)
    protected multiSelectState = signal<MultiSelectState>("none")
    protected selectAllOption = computed(() => {
        const option = { id: -9999, name: this.SELECT_ALL }
        switch (this.multiSelectState()) {
            case "none": option.name = this.SELECT_ALL; break;
            case "indeterminate": option.name = this.SELECT_ALL; break;
            case "all": option.name = this.DESELECT_ALL; break;
        }
        return option
    })
    protected showMoreDescription = computed(() => this.showMore() ? this.SHOW_LESS : this.SHOW_MORE)

    options = input.required<ExpandableSelectOption[]>()
    multiSelectForm = this.formBuilder.array<boolean>([])

    selected: number[] = []


    constructor() {
    }

    ngOnInit(): void {
        this.options().forEach(o => {
            console.log(o)
            this.multiSelectForm.push(this.formBuilder.control(false))
        })

    }

    toggleShowMore(_: Event): void {
        this.showMore.set(!this.showMore())
    }

    handleClick(event: Event): void {
        const target = event.target as HTMLElement
        if (target.tagName === "INPUT") {
            console.log("input")
        }
    }

    toggleSelectAll(_: Event): void {

    }


    writeValue(selected: number[]): void {
        this.selected = selected
        this.selected.forEach(id => { })

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
