import { createSlice } from "@reduxjs/toolkit";


export const SliderDataSlice = createSlice({
    name: "slider",
    initialState:{
        slider3D: [],
    },

    reducers:{
        fetchMovieSlideInfo: (state ,  action) => {
            state.slider3D = action.payload
        }
    }
})


export const {fetchMovieSlideInfo} =SliderDataSlice.actions;

export default SliderDataSlice.reducer;