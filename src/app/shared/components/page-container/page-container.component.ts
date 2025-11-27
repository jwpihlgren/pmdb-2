import { Component } from '@angular/core';

@Component({
    selector: 'app-page-container',
    imports: [],
    template: `<ng-content></ng-content>`,
    styles: [
        `:host {
min-height: calc(100vh - var(--app-header-height));
display: grid;
gap: var(--spacing-large, 2rem);
padding-inline: var(--spacing-extra-large, 4rem);
padding-block-start: var(--spacing-xx-large, 6rem);
@media(max-width: 768px) {
padding-inline: var(--spacing-medium);
padding-block-start: var(--spacing-large);

}

}`
    ],
})
export class PageContainerComponent {

}
