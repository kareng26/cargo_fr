import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cargo from "./slices/cargo.ts";
import points from "./slices/points.ts";
import addresses from "./slices/addresses.ts";

const store = () =>
    configureStore({
        reducer: combineReducers({
            cargo,
            points,
            addresses,
        }),
    });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store();
