import { combineReducers } from "@reduxjs/toolkit";
import { moviesReducer } from "../features/movies";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
