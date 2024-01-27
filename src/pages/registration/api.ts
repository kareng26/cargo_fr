import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api.ts";
import axios from "axios";

// export enum QcGeo {
//     EXACT_COORDINATES = "0",
//     NEAREST_HOUSE = "1",
//     STREET = "2",
//     LOCALITY = "3",
//     CITY = "4",
//     COORDINATES_NOT_DEFINED = "5",
// }

export enum FiasLevels {
    HOUSE = "8",
    APARTMENT = "9",
}

export interface DaDataSuggestion {
    data: Address;
}

type Nullable<T> = T | null;

export interface Address {
    fias_id: string;
    fias_level: FiasLevels;
    geo_lat: Nullable<string>;
    geo_lon: Nullable<string>;
    qc_geo: Nullable<"0" | "1" | "2" | "3" | "4" | "5">;
    qc_house: null;
}

const options = {
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${"207756860df769de104ceefb3e60b7498cba43d8"}`,
    },
};

type DaData = {
    suggestions: DaDataSuggestion[];
};

export const createCargo = createAsyncThunk<
    any,
    {
        name: string;
        description: string;
        receiver_name: string;
        receiver_contact: string;
        volume: number;
        weight: number;
        latitude: number;
        longitude: number;
        send_point: number;
    },
    { rejectValue: any }
>("cargo/create", async (_query, { rejectWithValue }) => {
    try {
        const { data } = await api.post("shipments/create", _query, {
            headers: {
                Authorization: 1,
                "Content-Type": "application/json",
            },
        });

        return data;
    } catch (error) {
        console.error("error", rejectWithValue(error));
        return rejectWithValue(error);
    }
});

export const getAllPoints = createAsyncThunk<any, any, { rejectValue: any }>(
    "all/points.ts",
    async (_query, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/points/all", {
                headers: {
                    Authorization: 1,
                    "Content-Type": "application/json",
                },
            });

            return data;
        } catch (error) {
            console.error("error", rejectWithValue(error));
            return rejectWithValue(error);
        }
    },
);

export const getAddresses = createAsyncThunk<any, string, { rejectValue: any }>(
    "dadata/getAddress",
    async (query, { rejectWithValue }) => {
        try {
            const {
                data: { suggestions },
            } = await axios.post<string, { data: DaData }>(
                "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
                { query },
                options,
            );

            return suggestions;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const createDocument = createAsyncThunk<
    any,
    {
        id: string;
        waybills: any;
        others: any;
    },
    { rejectValue: any }
>("document/create", async (_query, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append("waybills", _query.waybills[0]);
        Object.values(_query.others).forEach((doc: any) => {
            formData.append("others", doc);
        });

        const { data } = await api.post(
            `documents/create/${_query.id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        return data;
    } catch (error) {
        console.error("error", error);
        return rejectWithValue(error);
    }
});
