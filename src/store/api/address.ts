import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DaDataSuggestion } from "@/types.ts";

const addressApi = createApi({
    reducerPath: "addressApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Token ${import.meta.env.VITE_DA_DATA_TOKEN}`,
            );
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAddresses: builder.query<
            { suggestions: Array<DaDataSuggestion> },
            string
        >({
            query: (query) => {
                return {
                    url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
                    method: "POST",
                    body: { query },
                    mode: "cors",
                };
            },
        }),
    }),
});

export const { useGetAddressesQuery } = addressApi;

export { addressApi };
