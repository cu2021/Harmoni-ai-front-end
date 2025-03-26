import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  transition,
  style,
  animate,
  stagger,
  query,
} from '@angular/animations';
import { RecommendationService } from '../../services/recommendation.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-genre-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSpinner,
    MatIconModule,
    MovieCardComponent,
  ],
  templateUrl: './genre-recommendations.component.html',
  styleUrls: ['./genre-recommendations.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class GenreRecommendationsComponent {
  genres = ['Action', 'Comedy', 'Drama', 'Horror', 'ScienceFiction'];
  recommendationForm: FormGroup;
  movies: Movie[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private recommendationService: RecommendationService
  ) {
    this.recommendationForm = this.fb.group({
      selectedGenre: ['', Validators.required],
      topN: [
        10,
        [Validators.required, Validators.min(10), Validators.max(5000)],
      ],
    });
  }

  getRecommendations(): void {
    if (this.recommendationForm.valid) {
      this.loading = true;
      this.error = null;
      this.movies = [];
      const { selectedGenre, topN } = this.recommendationForm.value;
      this.recommendationService
        .getGenreRecommendations(selectedGenre, topN)
        .subscribe({
          next: (data) => {
            this.movies = data;
            this.loading = false;
          },
          error: (err) => {
            this.error =
              err.message || 'Failed to load recommendations for this genre.';
            this.loading = false;
          },
        });
    }
  }
}
