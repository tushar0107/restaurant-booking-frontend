import { createSlice } from "@reduxjs/toolkit";

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState:{},
    reducers:{
        saveRestaurants: (state,action)=>{
            console.log(action.payload);
            state.value = action.payload;
        },
        clearRestaurants: (state)=>{
            state.value = {};
        },
    },
});

export const {saveRestaurants, clearRestaurants} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;