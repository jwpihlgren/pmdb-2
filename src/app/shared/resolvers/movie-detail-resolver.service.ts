import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { DetailedMovie } from '../models/interfaces/detailed-movie';
import { DetailedMovieService } from '../services/detailed-movie.service';

@Injectable({
    providedIn: 'root'
})
export class MovieDetailResolverService implements Resolve<DetailedMovie> {

    constructor(private service: DetailedMovieService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetailedMovie> {
        const id = route.params["id"]
        if(id === null) return EMPTY
        return this.service.get(id)
    }
}

