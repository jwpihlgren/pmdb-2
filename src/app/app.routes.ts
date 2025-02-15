import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ShowsComponent } from './pages/shows/shows.component';
import { DetailedMovieComponent } from './pages/detailed-movie/detailed-movie.component';
import { DetailedShowComponent } from './pages/detailed-show/detailed-show.component';
import { ColorComponent } from './shared/components/color/color.component';
import { TrendingMoviesComponent } from './pages/movies/components/trending-movies/trending-movies.component';
import { PopularMoviesComponent } from './pages/movies/components/popular-movies/popular-movies.component';
import { DiscoverMoviesComponent } from './pages/movies/components/discover-movies/discover-movies.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", component: HomeComponent },
    { path: "movies", component: MoviesComponent, children: [
        {path: "", redirectTo:"trending", pathMatch:"full"},
        {path: "trending", component: TrendingMoviesComponent},
        {path: "popular", component: PopularMoviesComponent},
        {path: "discover", component: DiscoverMoviesComponent},
    ] },
    { path: "shows", pathMatch: "full", component: ShowsComponent },
    { path: "movies/:id", component: DetailedMovieComponent },
    { path: "shows/:id", pathMatch: "full", component: DetailedShowComponent },
    { path: "test", pathMatch: "full", component: ColorComponent},
    { path: "*", redirectTo: "" }
];
