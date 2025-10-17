import { Component, computed, contentChildren, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelectItemComponent } from './components/select-item/select-item.component';

@Component({
    selector: 'app-expandable-multi-select',
    imports: [],
    templateUrl: './expandable-multi-select.component.html',
    styleUrl: './expandable-multi-select.component.css',
})
export class ExpandableMultiSelectComponent {

    private contentChildren = contentChildren(SelectItemComponent)
    private SHOW_LESS = "show less"
    private SHOW_MORE = "show more"
    private LESS = 3

    protected formBuilder = inject(FormBuilder)
    protected showMore = signal(false)
    protected showMoreDescription = computed(() => this.showMore() ? this.SHOW_LESS : this.SHOW_MORE)

    visibleChildren = computed(() => {
        const visibleCount = !this.showMore ? this.LESS : this.contentChildren.length
        console.log(visibleCount)
        this.contentChildren().forEach(c => c.setVisible(false))
        this.contentChildren()
            .slice(0, visibleCount)
            .forEach(c => c.setVisible(true))
        return visibleCount
    })

    toggleShowMore(_: Event): void {
        this.showMore.set(!this.showMore())
    }

    toggleSelectAll(_: Event): void {
        this.contentChildren().forEach(c => c.setSelected(true))
    }

    toggleDeslectAll(_: Event): void {
        this.contentChildren().forEach(c => c.setSelected(false))
    }

    getCumulativeState(): MultiSelectState {
        if (this.contentChildren().every(c => c.isSelected)) return "all"
        if (this.contentChildren().some(c => c.isSelected)) return "indeterminate"
        return "none"
    }

}
type MultiSelectState = "none" | "indeterminate" | "all"
