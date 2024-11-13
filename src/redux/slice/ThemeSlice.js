
import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice= createSlice({
    name:"theme",
    initialState: {
        activeTheme: "dark",
    },
    reducers:{
         changeTheme: (state, action) => {
            state.activeTheme = action.payload
         }
    }
})


export const {changeTheme} = ThemeSlice.actions;

export default ThemeSlice.reducer