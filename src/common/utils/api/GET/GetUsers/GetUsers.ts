import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetUsers, IGetUsersErrorHandle } from "./interfaces/IGetUsers.ts";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../../../../firebaseConfig.ts";

export const GetUsers = createAsyncThunk<
    IGetUsers[],
    void,
    { rejectValue: IGetUsersErrorHandle }
>(
    "avatars/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const firebaseUsers: IGetUsers[] = querySnapshot.docs.map(
                (doc) => doc.data() as IGetUsers
            );

            const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
            if (!response.ok) {
                throw new Error("Failed to fetch users from JSONPlaceholder");
            }

            const jsonPlaceholderUsers: IGetUsers[] = await response.json();

            const existingUserIds = new Set(firebaseUsers.map((user) => user.id));
            const newUsers = jsonPlaceholderUsers.filter(
                (user) => !existingUserIds.has(user.id)
            );

            for (const newUser of newUsers) {
                await addDoc(collection(db, "users"), newUser);
            }

            return [...firebaseUsers, ...newUsers];
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
