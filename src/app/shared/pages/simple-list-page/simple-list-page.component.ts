import { Location, NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, Directive, inject, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({ selector: '[listItemImage]', standalone: true })
export class ListItemImageDirective { constructor(public template: TemplateRef<any>) { } }

@Directive({ selector: '[listItemTitle]', standalone: true })
export class ListItemTitleDirective { constructor(public template: TemplateRef<any>) { } }

@Directive({ selector: '[listItemContent]', standalone: true })
export class ListItemContentDirective { constructor(public template: TemplateRef<any>) { } }

@Directive({ selector: '[listItemExtra]', standalone: true })
export class ListItemExtraDirective { constructor(public template: TemplateRef<any>) { } }

@Component({
    selector: 'app-simple-list-page',
    imports: [RouterLink, NgTemplateOutlet],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './simple-list-page.component.html',
    styleUrl: './simple-list-page.component.css'
})

export class SimpleListPageComponent<T> {
    imageSlot = contentChild(ListItemImageDirective);
    titleSlot = contentChild(ListItemTitleDirective);
    contentSlot = contentChild(ListItemContentDirective);
    extraSlot = contentChild(ListItemExtraDirective);

    protected location: Location = inject(Location)
    loaded = input.required<boolean>()
    items = input.required<T[]>();
    options = input<SimpeListPageOptions>()

    goBack(event: Event): void {
        event.preventDefault()
        this.location.back()
    }
}


export interface SimpeListPageOptions {
    title?: string
    linkFn?: (item: any) => string[]
}
