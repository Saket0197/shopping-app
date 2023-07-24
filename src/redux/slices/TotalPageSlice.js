import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageValue: 1
}

export const pageSlice = createSlice({
    name: 'TotalPages',
    initialState,
    reducers:{
        setCount(state,action) {
            state.pageValue=action.payload;
        },
    }
});

export const {setCount} = pageSlice.actions;
export default pageSlice.reducer;