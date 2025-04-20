import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RoutingService {

    constructor() { }

    stubs = {
        MOVIE: "movies",
        SHOW: "shows",
        PERSON: "people"
    }

    primaryNavigation: Link[] = [
        { name: "Home", href: "", exact: true },
        { name: "Movies", href: this.stubs.MOVIE, exact: false },
        { name: "Shows", href: this.stubs.SHOW, exact: false },
    ]
}

interface Link {
    name: string
    href: string
    exact: boolean
}
