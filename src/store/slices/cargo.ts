import { createSlice } from "@reduxjs/toolkit";
import { createCargo } from "../../pages/registration/api.ts";

// const initialState = {};

const slice = createSlice({
    name: "cargo",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCargo.fulfilled, () => {
            // state.activities = payload
        });
    },
});

export default slice.reducer;
