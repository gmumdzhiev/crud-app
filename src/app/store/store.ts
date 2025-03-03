import { configureStore } from "@reduxjs/toolkit";
import {getPostReducer} from "../../common/utils/api/GET/GetPosts/reducers";

export const store = configureStore({
    reducer: {
    posts: getPostReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;