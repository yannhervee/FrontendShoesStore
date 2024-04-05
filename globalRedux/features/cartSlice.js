'use client';
import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart", 
    initialState: {
        cart: null
    },
    reducers:{
        cartItems: (state, action) => {
            state.cart = action.payload;
        },
    },
});

export const { cartItems } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;

// export const userCourseSlice = createSlice({
//     name: "userCourse", 
//     initialState: {
//         userCourse:null
//     },
//     reducers:{
//         chooseCourses: (state, action) => {
//             state.userCourse = action.payload;
//         },
//     },
// });

// export const { chooseCourses } = userCourseSlice.actions;

// export const selectUserCourse = (state) => state.userCourse.userCourse;

// export default userCourseSlice.reducer

