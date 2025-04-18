import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabbedMenuComponent } from '../../shared/components/tabbed-menu/tabbed-menu.component';

@Component({
    selector: 'app-movies',
    standalone: true,
    imports: [RouterOutlet, TabbedMenuComponent],
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css'
})
export class MoviesComponent {


    constructor() {
    }

    tabs = [
        { name: "trending", href: ["/", "movies", "trending"] },
        { name: "popular", href: ["/", "movies", "popular"] },
        { name: "discover", href: ["/", "movies", "discover"] },
    ]
}
