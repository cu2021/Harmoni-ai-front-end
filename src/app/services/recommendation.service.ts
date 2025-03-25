import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { GenreRecommendationResponse, PersonalizedRecommendationResponse } from '../models/recommendation-response';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPersonalizedRecommendations(userId: number, movieId: number, topN: number): Observable<any> {
    const params = { userId: userId.toString(), movieId: movieId.toString(), topN: topN.toString() };
    return this.http.get<PersonalizedRecommendationResponse>(`${this.apiUrl}/recommend`, { params }).pipe(
      map(response => response.data.recommendedMovies)
    );
  }

  getGenreRecommendations(genre: string, topN: number): Observable<any> {
    const params = { genre, topN: topN.toString() };
    return this.http.get<GenreRecommendationResponse>(`${this.apiUrl}/genreBasedRecommendation`, { params }).pipe(
      map(response => response.data.recommendedMovies)
    );
  }
}