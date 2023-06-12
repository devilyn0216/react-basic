import { configureStore } from '@reduxjs/toolkit'
import toastReducer from "./toastSlice";
import authReducer from "./authSlice";

export default configureStore({
    reducer: {
        toast: toastReducer,
        auth: authReducer
    }
})