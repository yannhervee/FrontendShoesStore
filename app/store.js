
import { configureStore } from "@reduxjs/toolkit";
//import userReducer  from "../features/cartSlice";
import cartReducer from "@/globalRedux/features/cartSlice";
import userReducer from  "@/globalRedux/features/cartSlice";
import guestCartReducer from "@/globalRedux/features/guestCartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer, 
    user: userReducer,
    guestCartReducer
    
    // userCourse: userCourseReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;