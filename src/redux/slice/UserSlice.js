import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        session: null,
    },
 reducers:{
    setSession: ( state, action) => {
        state.session = action.payload
    },
  
}
})

export const {setSession} = UserSlice.actions;
export default UserSlice.reducer; 