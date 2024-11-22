import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        session: null,
        // userName: null,
    },
 reducers:{
    setSession: ( state, action) => {
        state.session = action.payload
    },

    // setUserName: (state, action) =>{

    //     state.userName = action.payload;
    // }
 }
})

export const {setSession, setUserName} = UserSlice.actions;
export default UserSlice.reducer; 