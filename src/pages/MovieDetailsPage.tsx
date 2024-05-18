import { useEffect } from "react";
import { tv } from "tailwind-variants";
import { Button, Chip, Divider } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";

import { LeftArrow, StarIcon } from "../assets";
import { movieActions } from "../features/movies";
import { movieTypeToChip } from "../features/movies/constants";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const styles = tv({
  slots: {
    base: "flex flex-col items-center px-4 h-full pb-16 sm:pb-0",
    title: "font-bold text-2xl md:text-3xl text-content1-foreground",
    image: "max-w-md w-full",
    detailsContainer: ["flex flex-col gap-9 mt-4", "sm:flex-row"],
  },
});

const { base, title, image, detailsContainer } = styles();

export default function MovieDetails() {
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movies.movieDetails);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    if (!id) return;

    const loadMovie = async () => {
      try {
        dispatch(movieActions.loading());

        const apiAddr = import.meta.env.VITE_OMDB_API_URL;
        const searchParams = new URLSearchParams({
          i: id,
          apikey: import.meta.env.VITE_OMDB_API_KEY,
        }).toString();

        const url = new URL("?" + searchParams, apiAddr);
        const response = await fetch(url, { signal });
        const data = await response.json();

        if (!data) {
          throw new Error("No data found!");
        }

        dispatch(movieActions.setMovieDetails(data));
      } catch {
        dispatch(movieActions.error());
      }
    };

    loadMovie();

    return () => {
      abortController.abort();
      dispatch(movieActions.unsetMovieDetails());
    };
  }, [id, dispatch]);

  if (!movie) return null;

  return (
    <div className={base()}>
      <Button
        variant="flat"
        color="primary"
        onPress={() => navigate("/")}
        startContent={<LeftArrow className="text-xl" />}
        className="gap-1 w-max self-start"
      >
        Back
      </Button>

      <div className={detailsContainer()}>
        <img src={movie.Poster} alt={movie.Title} className={image()} />

        <div className="max-w-md">
          <h1 className={title()}>{movie.Title}</h1>

          <div className="flex items-center gap-4 mt-4 text-content1-foreground">
            <span className="flex gap-1 items-center">
              <StarIcon className="text-warning text-2xl" />
              {movie.imdbRating}
            </span>

            <Divider className="h-6" orientation="vertical" />

            {movie.Year}

            <Divider className="h-6" orientation="vertical" />

            {movieTypeToChip?.[movie.Type] || (
              <Chip variant="flat" className="capitalize" radius="sm">
                {movie.Type}
              </Chip>
            )}

            <Divider className="h-6" orientation="vertical" />
            {movie.Runtime}
          </div>

          <div className="mt-4 font-medium text-content2-foreground">
            {movie.Genre}
          </div>

          <p className="mt-6">
            <span className="font-semibold">Director:</span> {movie.Director}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Actors:</span> {movie.Actors}
          </p>

          <h2 className="mt-8 font-semibold text-xl text-content1-foreground">
            Summary
          </h2>
          <p className="mt-2 text-xl text-foreground">{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
