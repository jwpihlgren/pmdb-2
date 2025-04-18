import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-button',
    imports: [NgClass],
    templateUrl: './button.component.html',
    styleUrl: './button.component.css'
})
export class ButtonComponent {
    private _defaultParams: ButtonParams = {type: "primary"}

    params = input(this._defaultParams)
    click = output<Event>()

    onClick(event: Event): void {
        this.click.emit(event)
    }
}

export interface ButtonParams {
    type?: "primary" | "secondary" | "ternary"
}


