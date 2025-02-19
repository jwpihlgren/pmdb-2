import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-combobox',
    imports: [NgClass],
    templateUrl: './combobox.component.html',
    styleUrl: './combobox.component.css',
})
export class ComboboxComponent {
    
    protected open = false

    onToggle(event: Event): void {
        if (event.target === event.currentTarget) {
            this.open = !this.open
        }
    }

    handleKeyup(event: KeyboardEvent): void {
        if(event.key === "Escape") {
            this.open = false
        }
        console.log(event)
    }
}
