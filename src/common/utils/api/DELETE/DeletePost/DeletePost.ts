import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetPostErrorHandle } from "../../GET/GetPosts/interfaces/IGetPost.ts";


export const DeletePost = createAsyncThunk<
    string,
    string,
    { rejectValue: IGetPostErrorHandle }
>(
    'posts/deletePost',
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            return postId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
