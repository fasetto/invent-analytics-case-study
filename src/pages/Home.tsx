import { useEffect } from "react";
import { tv } from "tailwind-variants";
import { Input, Pagination, Select, SelectItem } from "@nextui-org/react";

import {
  MovieCard,
  movieActions,
  movieTypes,
  type MovieType,
} from "../features/movies";
import { useDebounce } from "../hooks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";

const styles = tv({
  slots: {
    base: ["flex flex-col gap-2 container pb-16"],
    movieList: [
      "grid gap-4 self-center mt-8",
      "grid-cols-1",
      "md:grid-cols-[repeat(2,minmax(0,max-content))]",
      "lg:grid-cols-[repeat(3,minmax(0,max-content))]",
    ],
    filterStyles: [
      "flex flex-col gap-3 w-[294px] mx-auto",
      "md:flex-row md:w-auto",
    ],
  },
});

const { base, movieList, filterStyles } = styles();

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    status,
    filters,
    pagination,
    data: movies,
  } = useAppSelector((state) => state.movies);
  const navigate = useNavigate();

  const searchParams = new URLSearchParams({
    s: filters.search,
    y: filters.year,
    type: filters.type,
    page: pagination.page.toString(),
    apikey: import.meta.env.VITE_OMDB_API_KEY,
  }).toString();

  const deferredQuery = useDebounce(searchParams, 300);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const loadMovies = async () => {
      try {
        dispatch(movieActions.loading());

        const apiAddr = import.meta.env.VITE_OMDB_API_URL;
        const url = new URL("?" + deferredQuery, apiAddr);
        const response = await fetch(url, { signal });
        const { Search: data, totalResults } = await response.json();

        if (!data) {
          throw new Error("No data found!");
        }

        dispatch(
          movieActions.setData({
            movies: data,
            total: +totalResults,
          })
        );
      } catch {
        dispatch(movieActions.error());
      }
    };

    loadMovies();

    return () => {
      abortController.abort();
    };
  }, [deferredQuery, dispatch]);

  return (
    <div className={base()}>
      <div className={filterStyles()}>
        <Input
          className="w-[240px]"
          variant="bordered"
          label="Search for"
          value={filters.search}
          onValueChange={(value) =>
            dispatch(movieActions.applyFilters({ search: value }))
          }
          onClear={() => dispatch(movieActions.clearFilter("search"))}
          isClearable
        />
        <Input
          className="w-[120px]"
          variant="bordered"
          label="Year"
          value={filters.year}
          onValueChange={(value) =>
            dispatch(movieActions.applyFilters({ year: value }))
          }
          onClear={() => dispatch(movieActions.clearFilter("year"))}
          isClearable
        />
        <Select
          label="Select type"
          classNames={{
            base: "w-[160px]",
            value: "capitalize",
            listbox: "capitalize",
          }}
          value={filters.type}
          onChange={(e) => {
            const value = e.target.value as MovieType;
            dispatch(movieActions.applyFilters({ type: value }));
          }}
        >
          {movieTypes.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className={movieList()}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            onClick={() => navigate(`/movies/${movie.imdbID}`)}
            isBusy={status === "busy"}
            {...movie}
          />
        ))}
      </div>

      <Pagination
        size="lg"
        className="self-center mt-5"
        total={Math.ceil(pagination.total / pagination.itemsPerPage)}
        page={pagination.page}
        onChange={(page) => dispatch(movieActions.changePage(page))}
      />
    </div>
  );
}
