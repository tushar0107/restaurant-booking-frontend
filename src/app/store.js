import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../user/UserSlice';
import restaurantsReducer from "../user/RestaurantsSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        restaurants: restaurantsReducer,
    },
});