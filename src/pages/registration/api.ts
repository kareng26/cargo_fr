import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api.ts";

type ShipmentCreateRespType = {
    id: string;
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
    },
    { rejectValue: any }
>("cargo/create", async (_query, { rejectWithValue }) => {
    try {
        console.info("query", _query);
        const { data } = await api.post("shipments/create", _query, {
            headers: {
                Authorization: 1,
                "Content-Type": "application/json",
            },
        });

        console.info("dataaaaa", data);
        return data;
    } catch (error) {
        console.error("error", error);
        return rejectWithValue(error);
    }
});

export const getAllPoints = createAsyncThunk<any, any, { rejectValue: any }>(
    "all/points",
    async (_query, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/points/all", {
                headers: {
                    Authorization: 1,
                    "Content-Type": "application/json",
                },
            });

            console.info("dataaaaa", data);
            return data;
        } catch (error) {
            console.error("error", error);
            return rejectWithValue(error);
        }
    },
);
