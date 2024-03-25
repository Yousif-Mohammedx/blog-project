import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem('account');
const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;