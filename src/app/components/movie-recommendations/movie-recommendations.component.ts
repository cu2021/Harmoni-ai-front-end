import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecommendationService } from '../../services/recommendation.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-recommendations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MovieCardComponent],
  templateUrl: './movie-recommendations.component.html',
  styleUrls: ['./movie-recommendations.component.scss']
})
export class MovieRecommendationsComponent implements OnInit {
  recommendationForm: FormGroup;
  movies: Movie[] = [];
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private recommendationService: RecommendationService
  ) {
    this.recommendationForm = this.fb.group({
      userId: ['', Validators.required],
      movieId: ['', Validators.required],
      topN: [3, Validators.min(1)]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.recommendationForm.valid) {
      this.loading = true;
      this.error = '';
      const { userId, movieId, topN } = this.recommendationForm.value;
      this.recommendationService.getPersonalizedRecommendations(userId, movieId, topN).subscribe({
        next: (response) => {
          this.movies = response;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load recommendations. Please try again.';
          this.loading = false;
        }
      });
    }
  }

}