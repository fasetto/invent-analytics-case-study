import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Movie, MovieType } from ".";

type State = {
  data: Movie[];
  pagination: {
    page: number;
    itemsPerPage: number;
    total: number;
  };
  filters: {
    search: string;
    year: string;
    type: MovieType | "";
  };
  status: "idle" | "busy" | "success" | "error";
};

const initialState: State = {
  data: [],
  status: "idle",
  filters: {
    search: "Pokemon",
    year: "",
    type: "",
  },
  pagination: {
    page: 1,
    itemsPerPage: 10,
    total: 10,
  },
};

type SetMoviesPayload = {
  movies: Movie[];
  total: number;
};

export type FilterKeys = keyof State["filters"];

type ApplyFiltersPayload = {
  [key in FilterKeys]?: State["filters"][key];
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    loading: (state) => {
      state.status = "busy";
    },
    setData: (state, action: PayloadAction<SetMoviesPayload>) => {
      const { movies, total } = action.payload;

      state.data = movies;
      state.status = "success";
      state.pagination.total = total;
    },
    error: (state) => {
      state.status = "error";
    },
    applyFilters: (state, action: PayloadAction<ApplyFiltersPayload>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };

      if (action.payload.search === "")
        state.filters.search = initialState.filters.search;
    },
    clearFilter: (state, action: PayloadAction<FilterKeys>) => {
      const key = action.payload;

      state.filters = {
        ...state.filters,
        [key]: "",
      };

      if (key === "search") state.filters.search = initialState.filters.search;
    },
  },
});

export const movieActions = moviesSlice.actions;
export default moviesSlice.reducer;
