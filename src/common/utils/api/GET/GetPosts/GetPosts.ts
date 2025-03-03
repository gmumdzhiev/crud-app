import { createAsyncThunk } from "@reduxjs/toolkit";
import {IPost} from "../../../../components/Content/interfaces/IPost.ts";
import {IGetPostErrorHandle} from "./interfaces/IGetPost.ts";


export const GetPosts = createAsyncThunk<IPost[], void, { rejectValue: IGetPostErrorHandle }>(
    'posts/getPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data: IPost[] = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
