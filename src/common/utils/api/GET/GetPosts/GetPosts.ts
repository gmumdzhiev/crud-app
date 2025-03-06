import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "../../../../components/Content/interfaces/IPost.ts";
import { IGetPostErrorHandle } from "./interfaces/IGetPost.ts";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../../../../firebaseConfig.ts";

export const GetPosts = createAsyncThunk<
    IPost[],
    void,
    { rejectValue: IGetPostErrorHandle }
>(
    "posts/getPosts",
    async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(collection(db, "posts"));
            const firebasePosts: IPost[] = querySnapshot.docs.map(
                (doc) => doc.data() as IPost
            );

            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            if (!response.ok) {
                throw new Error("Failed to fetch posts from JSONPlaceholder");
            }
            const jsonPlaceholderPosts: IPost[] = await response.json();

            const existingPostIds = new Set(firebasePosts.map((post) => post.id));
            const newPosts = jsonPlaceholderPosts.filter(
                (post) => !existingPostIds.has(post.id)
            );

            for (const newPost of newPosts) {
                await addDoc(collection(db, "posts"), newPost);
            }

            return [...firebasePosts, ...newPosts].sort(
                (a, b) => Number(a.id) - Number(b.id)
            );
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
