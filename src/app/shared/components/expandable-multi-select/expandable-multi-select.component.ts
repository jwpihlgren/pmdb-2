import { AfterViewInit, Component, computed, contentChildren, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelectItemComponent } from './components/select-item/select-item.component';

@Component({
    selector: 'app-expandable-multi-select',
    imports: [SelectItemComponent],
    templateUrl: './expandable-multi-select.component.html',
    styleUrl: './expandable-multi-select.component.css',
    host: {
        "(click)": "updateCumulativeState()"
    }
})
export class ExpandableMultiSelectComponent implements AfterViewInit {

    private contentChildren = contentChildren(SelectItemComponent)
    private SHOW_LESS = "show less"
    private SHOW_MORE = "show more"
    protected LESS = 3

    protected formBuilder = inject(FormBuilder)
    protected showMore = signal(false)
    protected showMoreDescription = computed(() => this.showMore() ? this.SHOW_LESS : this.SHOW_MORE)
    protected cumulativeState = signal<MultiSelectState>("none")


    ngAfterViewInit(): void {
        this.toggleVisibility()
    }

    toggleVisibility(): void {

        this.contentChildren().forEach(c => c.setVisible(false))
        if (this.showMore()) {
            this.contentChildren().forEach(c => c.setVisible(true))
        } else {
            this.contentChildren().slice(0, this.LESS).forEach(c => c.setVisible(true))
        }
    }

    updateCumulativeState() {
        if (this.contentChildren().every(c => c.isSelected())) this.cumulativeState.set("all")
        else if (this.contentChildren().some(c => c.isSelected())) this.cumulativeState.set("indeterminate")
        else this.cumulativeState.set("none")
    }

    optionsCount(): number {
        return this.contentChildren().length
    }

    toggleShowMore(_: Event): void {
        this.showMore.set(!this.showMore())
        this.toggleVisibility()
    }

    toggleAll(_: Event): void {
        if (this.contentChildren().every(c => c.isSelected())) {
            this.contentChildren().forEach(c => c.setSelected(false))
        } else {
            this.contentChildren().forEach(c => c.setSelected(true))
        }
    }
}
type MultiSelectState = "none" | "indeterminate" | "all"
