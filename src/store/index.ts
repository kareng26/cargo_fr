import { configureStore } from "@reduxjs/toolkit";
import { cargoApi, documentApi, addressApi } from "@/store/api";
import { cargoSlice } from "@/store/slice/cargo.ts";

const store = () =>
    configureStore({
        reducer: {
            [cargoApi.reducerPath]: cargoApi.reducer,
            [documentApi.reducerPath]: documentApi.reducer,
            [addressApi.reducerPath]: addressApi.reducer,
            cargo: cargoSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                cargoApi.middleware,
                documentApi.middleware,
                addressApi.middleware,
            ),
    });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store();
