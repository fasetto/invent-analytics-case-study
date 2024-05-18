export { default as moviesReducer, movieActions } from "./reducer";

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
};
