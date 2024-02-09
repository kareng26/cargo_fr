import { configureStore } from "@reduxjs/toolkit";
import { cargoApi, documentApi, addressApi } from "@/store/api";

const store = () =>
    configureStore({
        reducer: {
            [cargoApi.reducerPath]: cargoApi.reducer,
            [documentApi.reducerPath]: documentApi.reducer,
            [addressApi.reducerPath]: addressApi.reducer,
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
