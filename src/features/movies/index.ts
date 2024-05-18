export { default as MovieCard } from "./MovieCard";
export { default as moviesReducer, movieActions } from "./reducer";

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
}

export interface MovieDetails extends Movie {
  imdbRating: string;
  Plot: string;
  Genre: string;
  Director: string;
  Actors: string;
  Runtime: string;
}

export type MovieType = (typeof movieTypes)[number];

export const movieTypes = ["movie", "series", "episode", "game"] as const;
