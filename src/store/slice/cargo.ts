import { cargoApi } from "@/store/api";
import { createSlice } from "@reduxjs/toolkit";
import { CreateCargoRespType } from "@/types.ts";

const cargoSlice = createSlice({
    name: "cargo",
    initialState: {
        cargo: {} as CreateCargoRespType,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            cargoApi.endpoints.createCargo.matchFulfilled,
            (state, { payload }) => {
                state.cargo = payload;
            },
        );
    },
});

export { cargoSlice };
