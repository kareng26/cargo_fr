import { createSlice } from "@reduxjs/toolkit";
import { getAllPoints } from "../../pages/registration/api.ts";

type Point = {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
};

type IStateType = {
    points: Array<Point>;
};

const initialState: IStateType = {
    points: [],
};

const slice = createSlice({
    name: "points",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPoints.fulfilled, (state, { payload }) => {
            state.points = payload;
        });
    },
});

export default slice.reducer;
