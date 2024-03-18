import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        login: (state,action)=>{
            state.value = action.payload[0];
            // console.log(action.payload[0]);
            console.log(state.value);
        },
        logout: (state)=>{
            state.value = {};
        },
    },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;