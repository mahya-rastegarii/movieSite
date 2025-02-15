
import { createSlice } from "@reduxjs/toolkit";

export const MoviesSlice = createSlice({
    name:"moviesList",
    initialState: {
        movieList: [],
        movieData: [],
       
       
    },
    reducers: {
        fetchMoviesList: (state, action) => {
            state.movieList = action.payload;
        },
        fetchMovie: (state, action) =>{
            state.movieData = action.payload;
        },
      
        

    },
})


export const {fetchMoviesList, fetchMovie, } = MoviesSlice.actions;

export default MoviesSlice.reducer;