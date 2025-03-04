import { createAsyncThunk } from "@reduxjs/toolkit";

import {IGetUsers, IGetUsersErrorHandle} from "./interfaces/IGetUsers.ts";

export const GetUsers = createAsyncThunk<IGetUsers[], void, { rejectValue: IGetUsersErrorHandle }>(
    "avatars/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch avatars");
            }

            const data: IGetUsers[] = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
