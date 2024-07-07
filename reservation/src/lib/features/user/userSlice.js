import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedin: false,
    userType: null,
    userDetails: {}
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isLoggedIn = true;
            state.userType = action.payload.userType;
            state.userDetails = action.payload.userDetails;
          },
          clearUser: (state) => {
            state.isLoggedIn = false;
            state.userType = null;
            state.userDetails = {};
          },
    }

})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;