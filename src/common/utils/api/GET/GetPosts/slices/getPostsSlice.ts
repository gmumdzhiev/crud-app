import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IPost } from "../../../../../components/Content/interfaces/IPost.ts";
import { GetPosts } from "../GetPosts.ts";
import { DeletePost } from "../../../DELETE/DeletePost/DeletePost.ts";


const deletedPostIdsFromStorage = JSON.parse(localStorage.getItem("deletedPosts") || "[]");

interface PostsState {
    status: "idle" | "loading" | "succeeded" | "failed";
    list: IPost[];
    deletedPostIds: string[];
    error: string | null;
}

const initialState: PostsState = {
    status: "idle",
    list: [],
    deletedPostIds: deletedPostIdsFromStorage,
    error: null,
};

const getPostsSlice = createSlice({
    name: "get-posts",
    initialState,
    reducers: {
        addPost(state, action) {
            state.list.unshift(action.payload);
        },
        markPostAsDeleted(state, action) {
            state.deletedPostIds.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(GetPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                const posts = action.payload as IPost[];
                state.list = posts.filter(
                    (post) => !state.deletedPostIds.includes(post.id)
                );
                state.error = null;
            })
            .addCase(GetPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(DeletePost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(DeletePost.fulfilled, (state, action) => {
                state.status = "succeeded";
                const postId = action.payload;
                state.list = state.list.filter((post) => post.id !== postId);
                state.deletedPostIds.push(postId);
                toast.success("Post deleted successfully!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                const deletedPostIds = JSON.parse(localStorage.getItem("deletedPosts") || "[]");
                deletedPostIds.push(postId);
                localStorage.setItem("deletedPosts", JSON.stringify(deletedPostIds));
            })
            .addCase(DeletePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                toast.error(`Error: ${action.payload}`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    },
});

export const { addPost, markPostAsDeleted } = getPostsSlice.actions;
export default getPostsSlice.reducer;
