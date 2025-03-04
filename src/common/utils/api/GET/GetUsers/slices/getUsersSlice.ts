import { createSlice } from "@reduxjs/toolkit";
import {GetUsers} from "../GetUsers.ts";
import {IGetUsers} from "../interfaces/IGetUsers.ts";


interface UsersState {
    list: IGetUsers[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UsersState = {
    list: [],
    status: "idle",
    error: null,
};

const getUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(GetUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(GetUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Failed to fetch avatars";
            });
    },
});

export default getUsersSlice.reducer;
