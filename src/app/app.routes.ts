import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ShowsComponent } from './pages/shows/shows.component';
import { DetailedMovieComponent } from './pages/detailed-movie/detailed-movie.component';
import { DetailedShowComponent } from './pages/detailed-show/detailed-show.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", component: HomeComponent },
    { path: "movies", pathMatch: "full", component: MoviesComponent },
    { path: "shows", pathMatch: "full", component: ShowsComponent },
    { path: "movies/:id", component: DetailedMovieComponent },
    { path: "shows/:id", pathMatch: "full", component: DetailedShowComponent },
    { path: "*", redirectTo: "" }
];
