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
import { DetailedPeopleComponent } from './pages/detailed-people/detailed-people.component';
import { PeopleComponent } from './pages/people/people.component';
import { TrendingShowsComponent } from './pages/shows/components/trending-shows/trending-shows.component';
import { PopularShowsComponent } from './pages/shows/components/popular-shows/popular-shows.component';
import { DiscoverShowsComponent } from './pages/shows/components/discover-shows/discover-shows.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", component: HomeComponent },
    {
        path: "movies", component: MoviesComponent, children: [
            { path: "", redirectTo: "trending", pathMatch: "full" },
            { path: "trending", component: TrendingMoviesComponent },
            { path: "popular", component: PopularMoviesComponent },
            { path: "discover", component: DiscoverMoviesComponent },
        ]
    },
    { path: "movies/:id", component: DetailedMovieComponent },
    {
        path: "shows", component: ShowsComponent, children: [
            { path: "", redirectTo: "trending", pathMatch: "full" },
            { path: "trending", component: TrendingShowsComponent },
            { path: "popular", component: PopularShowsComponent  },
            { path: "discover", component: DiscoverShowsComponent },

        ]
    },
    { path: "shows/:id", pathMatch: "full", component: DetailedShowComponent },
    { path: "people/", pathMatch: "full", component: PeopleComponent },
    { path: "people/:id", pathMatch: "full", component: DetailedPeopleComponent },
    { path: "test", pathMatch: "full", component: ColorComponent },
    { path: "*", redirectTo: "" }
];
