import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}