import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecommendationService } from '../../services/recommendation.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-genre-recommendations',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent],
  templateUrl: './genre-recommendations.component.html',
  styleUrls: ['./genre-recommendations.component.scss']
})
export class GenreRecommendationsComponent {
  genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']; // Customize as needed
  selectedGenre = '';
  topN = 3;
  movies: Movie[] = [];
  loading = false;
  error = '';

  constructor(private recommendationService: RecommendationService) {}

  getRecommendations(): void {
    if (!this.selectedGenre) {
      this.error = 'Please select a genre.';
      return;
    }
    this.loading = true;
    this.error = '';
    this.movies = [];
    this.recommendationService.getGenreRecommendations(this.selectedGenre, this.topN).subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load recommendations for this genre.';
        this.loading = false;
      }
    });
  }
}