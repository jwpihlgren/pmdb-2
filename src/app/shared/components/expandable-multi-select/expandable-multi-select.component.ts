import { Component, computed, input, signal } from '@angular/core';

@Component({
    selector: 'app-expandable-multi-select',
    imports: [],
    templateUrl: './expandable-multi-select.component.html',
    styleUrl: './expandable-multi-select.component.css'
})
export class ExpandableMultiSelectComponent {

    private MAX_WHEN_HIDDEN = 3
    private SHOW_LESS = "show less"
    private SHOW_MORE = "show more"
    private SELECT_ALL = "select all"
    private DESELECT_ALL = "deselect all"

    protected showMore = signal(false)
    protected multiSelectState = signal<MultiSelectState>("none")
    protected selectAllOption = computed(() => {
        const option = {id: -9999, name: this.SELECT_ALL}
        switch(this.multiSelectState()) {
            case "none": option.name = this.SELECT_ALL; break; 
            case "indeterminate": option.name = this.SELECT_ALL; break; 
            case "all": option.name = this.DESELECT_ALL; break; 
        }
        return option
    })
    protected showMoreDescription = computed(() => this.showMore() ? this.SHOW_LESS : this.SHOW_MORE)
    protected showMoreOptions = computed(() => [this.selectAllOption(), ...this.options().slice(0, this.showMore() ? this.options.length : this.MAX_WHEN_HIDDEN)])


    options = input.required<ExpandableSelectOption[]>()

    toggleShowMore(_: Event): void {
        this.showMore.set(!this.showMore())
    }

    toggleSelectAll(_: Event): void {
        
    }

}

type ExpandableSelectOption = { id: number, name: string }
type MultiSelectState = "none" | "indeterminate" | "all"
