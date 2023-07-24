import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartValue: []
}

export const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers:{
        addToCart(state,action) {
            state.cartValue.push(action.payload);
        },

        removeFromCart(state,action) {
            let arr = state.cartValue.filter((eachobj) => {
                return eachobj.id !== action.payload
            });
            state.cartValue.length =0;
            state.cartValue = [...arr]; 
        },

        emptyCart(state) {
            state.cartValue.length = 0;
        }
    }
});

export const {addToCart,removeFromCart,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;