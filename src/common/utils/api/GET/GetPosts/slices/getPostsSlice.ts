import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IPost } from "../../../../../components/Content/interfaces/IPost.ts";
import { GetPosts } from "../GetPosts.ts";
import {DeletePost} from "../../../DELETE/DeletePost/DeletePost.ts";


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

const getPostsSlice = createSlice({
    name: "get-posts",
    initialState,
    reducers: {
        addPost(state, action) {
            state.list.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(GetPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload as IPost[];
                state.error = null;
            })
            .addCase(GetPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(DeletePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(DeletePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = state.list.filter(post => post.id !== action.payload);
                toast.success("Post deleted successfully!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .addCase(DeletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
                toast.error(`Error: ${action.payload}`,{
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    },
});

export const { addPost } = getPostsSlice.actions;
export default getPostsSlice.reducer;
