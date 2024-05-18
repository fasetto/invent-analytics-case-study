import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from ".";

type State = {
  data: Movie[];
  status: "idle" | "busy" | "success" | "error";
};

const initialState: State = {
  data: [],
  status: "idle",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    loading: (state) => {
      state.status = "busy";
    },
    setData: (state, action: PayloadAction<Movie[]>) => {
      state.status = "success";
      state.data = action.payload;
    },
    error: (state) => {
      state.status = "error";
    },
  },
});

export const movieActions = moviesSlice.actions;
export default moviesSlice.reducer;
