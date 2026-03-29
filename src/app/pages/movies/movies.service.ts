import { inject, Injectable } from '@angular/core';
import { MovieDiscoverQuery } from './discover/movie-discover-query';
import { ResultMovie } from '@app/shared/models/interfaces/result-movie';
import { Observable, of } from 'rxjs';
import PaginatedResult from '@app/shared/models/types/paginated-result.type';
import { Params } from '@angular/router';
import { TmdbResultMovie } from '@app/shared/models/classes/tmdb-result-movie';
import { MOVIE_DISCOVER_ADAPTER } from './discover/movie-discover-adapter.token';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    private adapter = inject<MovieDiscoverAdapter>(MOVIE_DISCOVER_ADAPTER)

    tmdbService = inject(TmdbDiscoverMovieAdapter)

    constructor() { }

    discover(query: MovieDiscoverQuery): Observable<PaginatedResult<ResultMovie>> {
        return (this.adapter.discover(query))
    }
}






