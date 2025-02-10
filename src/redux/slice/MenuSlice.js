import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
    name: "menu",
    initialState: {
        showMenu: false,
    },
 reducers:{
    setShowMenu: ( state, action) => {
        state.showMenu = action.payload
    },
  
}
})

export const {setShowMenu} = MenuSlice.actions;
export default MenuSlice.reducer
