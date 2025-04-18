import { Component, input, InputSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tabbed-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './tabbed-menu.component.html',
  styleUrl: './tabbed-menu.component.css'
})
export class TabbedMenuComponent {
    params: InputSignal<TabbedMenuParams> = input.required()
}


interface TabbedMenuParams {
    tabs: {
        name: string
        href: string[]
    }[]
}
