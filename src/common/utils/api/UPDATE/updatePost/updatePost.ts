import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "../../../../components/Content/interfaces/IPost.ts";
import { db } from "../../../../../../firebaseConfig.ts";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export const updatePost = createAsyncThunk<IPost, IPost>(
    "posts/updatePost",
    async (updatedPost, { rejectWithValue }) => {
        try {

            const postRef = doc(db, "posts", String(updatedPost.id));

            const postSnap = await getDoc(postRef);
            if (!postSnap.exists()) {
                console.error("Document does not exist in Firestore:", updatedPost.id);
                return rejectWithValue(`Post with ID ${updatedPost.id} not found`);
            }

            await updateDoc(postRef, {
                title: updatedPost.title,
                body: updatedPost.body,
            });


            return updatedPost;
        } catch (error) {
            console.error("Error updating post in Firestore:", error);
            return rejectWithValue(error.message);
        }
    }
);
