import { Movie } from "./movie";

export interface PersonalizedRecommendationResponse {
  data: {
    userId: number;
    movieId: number;
    recommendedMovies: Movie[];
  };
  message: string;
  status: boolean;
}

export interface GenreRecommendationResponse {
  data: {
    genre: string;
    recommendedMovies: Movie[];
  };
  message: string;
  status: boolean;
}