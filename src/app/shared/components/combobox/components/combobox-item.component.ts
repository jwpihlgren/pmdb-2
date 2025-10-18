import { Component, computed, input, signal } from '@angular/core';

@Component({
    selector: 'app-combobox-item',
    standalone: true,
    imports: [],
    templateUrl: './combobox-item.component.html',
    styleUrl: './combobox-item.component.css',
    host: {
        '[class.disabled]': 'isDisabled()',
        '[class.selected]': 'isSelected()',
        '[attr.role]': '"option"',
        '[attr.value]': 'value()',
        '[attr.tabindex]': '"-1"',
    }
})

export class ComboboxItemComponent {

    value = input<string>()
    disabled = input(false)
    private internalDisabled = signal(false)
    isDisabled = computed(() => this.disabled() ? this.disabled() : this.internalDisabled())
    isSelected = signal(false)

    constructor() { }

    setSelected(selected: boolean) {
        this.isSelected.set(selected)
    }

    setDisabled() {
        this.internalDisabled.set(!this.internalDisabled())
    }
}
