import { Component, input, InputSignal, output } from '@angular/core';

@Component({
    selector: 'app-chip',
    imports: [],
    templateUrl: './chip.component.html',
    styleUrl: './chip.component.css'
})
export class ChipComponent {
    value: InputSignal<string> = input.required()

    action = output<string>()

    onClick(value: string) {
        console.log("click")
        this.action.emit(value)
    }

    handleKeyup(params: {value: string, event: KeyboardEvent}):void {
        console.log(params)
        if(params.event.key !== " " && params.event.key !== "Space") return
        this.onClick(params.value)
    }
}
