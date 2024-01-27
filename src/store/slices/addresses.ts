import { createSlice } from "@reduxjs/toolkit";
import {
    DaDataSuggestion,
    getAddresses,
} from "../../pages/registration/api.ts";

type IStateType = {
    addresses: Array<DaDataSuggestion>;
};

const initialState: IStateType = {
    addresses: [],
};

const slice = createSlice({
    name: "addresses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAddresses.fulfilled, (state, { payload }) => {
            state.addresses = payload;
        });
    },
});

export default slice.reducer;
