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
}
