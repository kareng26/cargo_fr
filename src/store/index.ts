import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cargo from "./slices/cargo.ts";

const store = () =>
    configureStore({
        reducer: combineReducers({
            cargo,
        }),
    });

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
export default store();
