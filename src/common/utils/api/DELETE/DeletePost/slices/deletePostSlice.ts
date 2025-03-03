import { createSlice } from "@reduxjs/toolkit";
import {DeletePost} from "../DeletePost.ts";
import {IPost} from "../../../../../components/Content/interfaces/IPost.ts";

interface PostsState {
    status: "idle" | "loading" | "succeeded" | "failed";
    list: IPost[];
    error: string | null;
}

const initialState: PostsState = {
    status: "idle",
    list: [],
    error: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(DeletePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(DeletePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = state.list.filter(post => post.id !== action.payload);
            })
            .addCase(DeletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default postsSlice.reducer;
