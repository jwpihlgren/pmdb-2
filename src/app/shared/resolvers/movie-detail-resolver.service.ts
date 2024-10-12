import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { MovieDetailService } from '../services/movie-detail.service';
import { MovieDetails } from '../models/interfaces/movie-details';

@Injectable({
    providedIn: 'root'
})
export class MovieDetailResolverService implements Resolve<MovieDetails> {

    constructor(private service: MovieDetailService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetails> {
        const id = route.queryParamMap.get("id")
        console.log(id)
        if(id === null) return EMPTY
        return this.service.get(id)
    }
}

