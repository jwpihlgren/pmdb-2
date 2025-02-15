import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-movies',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css'
})
export class MoviesComponent {

    constructor() { }
    tabs = [
        { name: "trending", href: "trending" },
        { name: "popular", href: "popular" },
        { name: "discover", href: "discover" },
    ]
}
