export { default as MovieCard } from "./MovieCard";
export { default as moviesReducer, movieActions } from "./reducer";

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
};

export type MovieType = (typeof movieTypes)[number];

export const movieTypes = ["movie", "series", "episode", "game"] as const;
