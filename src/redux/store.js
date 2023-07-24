import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/CartSlice';
import pageReducer from './slices/TotalPageSlice';

export const store = configureStore({

    reducer:{
        Cart:cartReducer,
        TotalPages:pageReducer
    }

});
