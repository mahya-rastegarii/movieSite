import { createSlice } from "@reduxjs/toolkit";



export const GenreSlice = createSlice({
    name:'activeType',
    initialState:{
        typeGenre: 'movies',
        genres: []
    },
    reducers:{
        changeType:(state, action) => {
            state.typeGenre = action.payload
        },

        getGenres: (state, action) => {
            state.genres = [action.payload]
        }
    }
})

export const {changeType, getGenres}= GenreSlice.actions;
export default GenreSlice.reducer;