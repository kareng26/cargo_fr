import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    GetUserCargoRespType,
    GetUserCargoArgType,
    CreateCargoArgType,
    CreateCargoRespType,
} from "@/types.ts";

const cargoApi = createApi({
    reducerPath: "cargoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", "7");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createCargo: builder.mutation<
            CreateCargoRespType,
            Partial<CreateCargoArgType>
        >({
            query: (body) => ({
                url: "/shipments/create",
                method: "POST",
                body,
            }),
        }),
        getUserCargoes: builder.query<
            GetUserCargoRespType,
            GetUserCargoArgType
        >({
            query: (params) => ({
                url: "/shipments/user",
                method: "GET",
                params,
            }),
        }),
    }),
});

export const { useCreateCargoMutation, useGetUserCargoesQuery } = cargoApi;

export { cargoApi };
