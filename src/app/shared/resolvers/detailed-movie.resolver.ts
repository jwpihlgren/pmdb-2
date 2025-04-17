import { ResolveFn } from '@angular/router';
import { DetailedMovie } from '../models/interfaces/detailed-movie';
import { DetailedMovieService } from '../services/detailed-movie.service';
import { inject } from '@angular/core';

export const detailedMovieResolver: ResolveFn<DetailedMovie> = (route, state) => {
  const service: DetailedMovieService = inject(DetailedMovieService)
    const id = route.params["id"]
    console.log(route, id)
    return service.get(id)
};

