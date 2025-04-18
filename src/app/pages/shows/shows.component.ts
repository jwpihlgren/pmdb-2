import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabbedMenuComponent } from '../../shared/components/tabbed-menu/tabbed-menu.component';

@Component({
    selector: 'app-shows',
    standalone: true,
    imports: [RouterOutlet, TabbedMenuComponent],
    templateUrl: './shows.component.html',
    styleUrl: './shows.component.css'
})
export class ShowsComponent {


    constructor() {
   }

       tabs = [
        { name: "trending", href: ["/", "shows", "trending"] },
        { name: "popular", href: ["/", "shows", "popular"] },
        { name: "discover", href: ["/", "shows", "discover"] },
    ]

}
