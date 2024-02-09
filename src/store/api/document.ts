import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateDocumentArgs, CreateDocumentReturned } from "@/types.ts";

const documentApi = createApi({
    reducerPath: "documentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            headers.set("Authorization", "7");
            headers.set("Content-Type", "multipart/form-data");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createDocument: builder.mutation<
            CreateDocumentReturned,
            Partial<CreateDocumentArgs>
        >({
            query: ({ id, ...rst }) => {
                const { waybills, others } = rst;
                const formData = new FormData();
                formData.append("waybills", waybills![0]);
                Object.values(others!).forEach((doc) => {
                    formData.append("others", doc);
                });

                return {
                    url: `documents/create/${id}`,
                    method: "POST",
                    body: rst,
                };
            },
        }),
    }),
});

export const { useCreateDocumentMutation } = documentApi;

export { documentApi };
