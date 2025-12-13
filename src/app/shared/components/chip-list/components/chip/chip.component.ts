import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-chip',
    imports: [RouterLink, NgClass],
    templateUrl: './chip.component.html',
    styleUrl: './chip.component.css'
})
export class ChipComponent {
    value = input.required<string>()
    action = input(false)
    link = input<ChipLink | undefined>(undefined)


    clickRequest = output<string>()

    onClick(value: string) {
        this.clickRequest.emit(value)
    }

    handleKeyup(params: { value: string, event: KeyboardEvent }): void {
        if (params.event.key !== " " && params.event.key !== "Space") return
        this.onClick(params.value)
    }
}


interface ChipLink {
    href: string[]
    queryParams?: Record<string, string>
}
