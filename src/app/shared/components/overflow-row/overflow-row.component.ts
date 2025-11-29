import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-overflow-row',
    imports: [RouterLink],
    templateUrl: './overflow-row.component.html',
    styleUrl: './overflow-row.component.css'
})
export class OverflowRowComponent {
    options = input.required<OverflowRowOptions>()
}
export default interface OverflowRowOptions {
    title: string
    showMoreLink?: string[] | undefined
    fallbackText: string
    fallback: boolean
}
