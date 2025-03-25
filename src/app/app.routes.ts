import { Routes } from "@angular/router";
import { GenreRecommendationsComponent } from "./components/genre-recommendations/genre-recommendations.component";
import { MovieRecommendationsComponent } from "./components/movie-recommendations/movie-recommendations.component";

export const routes: Routes = [
  { path: 'personalized', component: MovieRecommendationsComponent },
  { path: 'genre', component: GenreRecommendationsComponent },
  { path: '', redirectTo: '/personalized', pathMatch: 'full' }
];