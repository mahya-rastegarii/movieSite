
import { createSlice } from "@reduxjs/toolkit";

export const MoviesSlice = createSlice({
    name:"moviesList",
    initialState: {
        movieList: [],
        movieData: [],
       favoritesMovie: [],
        
    },
    reducers: {
        fetchMoviesList: (state, action) => {
            state.movieList = action.payload;
        },
        fetchMovie: (state, action) =>{
            state.movieData = action.payload;
        },
        setFavoritesMovie: (state,action) => {
            state.favoritesMovie = [...state.favoritesMovie, action.payload]
        }

    },
})


export const {fetchMoviesList, fetchMovie, setFavoritesMovie} = MoviesSlice.actions;

export default MoviesSlice.reducer;