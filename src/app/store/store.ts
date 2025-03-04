import { configureStore } from "@reduxjs/toolkit";
import {getPostReducer} from "../../common/utils/api/GET/GetPosts/reducers";
import {getUsersReducer} from "../../common/utils/api/GET/GetUsers/reducers";

export const store = configureStore({
    reducer: {
    posts: getPostReducer,
    users: getUsersReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, avatars: UsersState}
export type AppDispatch = typeof store.dispatch;