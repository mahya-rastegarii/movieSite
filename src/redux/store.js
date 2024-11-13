
import { configureStore } from '@reduxjs/toolkit';
import GenreReducer from './slice/GenreSlice';
import SliderDataReducer from './slice/SliderDataSlice';
import MoviesReducer from './slice/MoviesSlice'
import ThemeReducer from './slice/ThemeSlice';
import UserReducer from './slice/UserSlice';

export const store = configureStore({
  reducer: {
    genre: GenreReducer,
    slider: SliderDataReducer,
    movies: MoviesReducer,
    theme: ThemeReducer,
    user: UserReducer,
  }
 
})