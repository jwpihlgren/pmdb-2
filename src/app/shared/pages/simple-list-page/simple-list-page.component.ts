import { Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-list-item',
    standalone: true,
    imports: [RouterLink],
    encapsulation: ViewEncapsulation.None,
    template: `
<li>
    <a [routerLink]="link()" class="list__item">
        <div class="list__item-image">
            <ng-content select="[slot='image']"></ng-content>
        </div>
        <div class="list__item-body">
            <div class="list__item-title label-medium">
                <ng-content select="[slot='title']"></ng-content>
            </div>
            <div class="list__item-content">
                <ng-content select="[slot='content']"></ng-content>
            </div>
        </div>
    </a>
</li>
`
})
export class ListItemComponent {
    link = input<string[]>()
}

@Component({
    selector: 'app-simple-list-page',
    imports: [RouterLink],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './simple-list-page.component.html',
    styleUrl: './simple-list-page.component.css'
})

export class SimpleListPageComponent {
    loaded = input.required<boolean>()
    options = input<SimpleListPageOptions>()
    back = input<string[]>()
}


export interface SimpleListPageOptions {
    title?: string
}
