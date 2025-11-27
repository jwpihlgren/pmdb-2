import { Component, input } from '@angular/core';

@Component({
    selector: 'app-simple-grid',
    imports: [],
    host: {
        '[style.--max-width]': 'maxWidth()'
    },
    template: `
<ul class="grid-list">
    <ng-content></ng-content>
</ul>
`,
    styles: [
        `
.grid-list {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--max-width)), 1fr));
gap: var(--spacing-large);
}
`
    ]
})
export class SimpleGridComponent {
    maxWidth = input<string>("200px")
}
