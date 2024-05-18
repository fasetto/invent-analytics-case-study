import { tv } from "tailwind-variants";
import { MovieCard, movieTypes } from "../features/movies";
import { useAppSelector } from "../store/hooks";
import { Input, Select, SelectItem } from "@nextui-org/react";

const styles = tv({
  slots: {
    base: ["flex flex-col gap-2 container"],
    movieList: [
      "grid gap-4 self-center mt-8",
      "grid-cols-1",
      "md:grid-cols-[repeat(2,minmax(0,max-content))]",
      "lg:grid-cols-[repeat(3,minmax(0,max-content))]",
    ],
    filters: "flex gap-3 mx-auto",
  },
});

const { base, movieList, filters } = styles();

export default function Home() {
  const movies = useAppSelector((state) => state.movies.data);

  return (
    <div className={base()}>
      <div className={filters()}>
        <Input
          className="w-[240px]"
          variant="bordered"
          label="Search for"
          isClearable
        />
        <Input
          min={1800}
          className="w-[120px]"
          variant="bordered"
          label="Year"
          isClearable
        />
        <Select
          label="Select type"
          classNames={{
            base: "w-[160px]",
            value: "capitalize",
            listbox: "capitalize",
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
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </div>
    </div>
  );
}
