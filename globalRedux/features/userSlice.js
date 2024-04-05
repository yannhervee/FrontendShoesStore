'use client';
import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user", 
    initialState: {
        user: null
    },
    reducers:{
        userInfo: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { userInfo } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;