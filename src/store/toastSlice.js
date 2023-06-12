import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toasts: []
};

const toastSlice = createSlice({
    name: 'toasts',
    initialState,
    reducers: {

    }
});

export default toastSlice.reducer;