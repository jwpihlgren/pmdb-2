import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { DetailedMovieService } from '../services/movie-detail.service';
import { DetailedMovie } from '../models/interfaces/detailed-movie';

@Injectable({
    providedIn: 'root'
})
export class MovieDetailResolverService implements Resolve<DetailedMovie> {

    constructor(private service: DetailedMovieService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetails> {
        const id = route.queryParamMap.get("id")
        console.log(id)
        if(id === null) return EMPTY
        return this.service.get(id)
    }
}

