import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    GetUserCargoRespType,
    GetUserCargoArgType,
    CreateCargoArgType,
    CreateCargoRespType,
    GetCargoRespType,
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
        getCargo: builder.query<GetCargoRespType, number>({
            query: (params) => ({
                url: `/shipments/single/${params}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateCargoMutation,
    useGetUserCargoesQuery,
    useGetCargoQuery,
} = cargoApi;

export { cargoApi };
