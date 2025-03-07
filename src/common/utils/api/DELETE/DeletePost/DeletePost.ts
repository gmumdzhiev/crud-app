import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetPostErrorHandle } from "../../GET/GetPosts/interfaces/IGetPost.ts";
import {markPostAsDeleted} from "../../GET/GetPosts/slices/getPostsSlice.ts";

export const DeletePost = createAsyncThunk<
    string,
    string,
    { rejectValue: IGetPostErrorHandle }
>(
    "posts/deletePost",
    async (postId: string, { dispatch, rejectWithValue }) => {
        try {

            dispatch(markPostAsDeleted(postId));
            const deletedPostIds = JSON.parse(localStorage.getItem("deletedPosts") || "[]");
            deletedPostIds.push(postId);
            localStorage.setItem("deletedPosts", JSON.stringify(deletedPostIds));

            return postId;
        } catch (error) {
            let errorMessage = "An unknown error occurred";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return rejectWithValue({
                message: errorMessage,
            });
        }
    }
);
