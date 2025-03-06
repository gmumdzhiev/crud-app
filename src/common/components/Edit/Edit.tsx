import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store/store.ts";
import { IPost } from "../Content/interfaces/IPost.ts";
import {updatePost} from "../../utils/api/UPDATE/updatePost/updatePost.ts";
import {IProps} from "./IProps.ts";


export const Edit = ({ post, onClose }: IProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);

    const handleUpdate = () => {
        if (!title.trim() || !body.trim()) return;

        const updatedPost: IPost = {...post, title, body};

        dispatch(updatePost(updatedPost));
        onClose();
    }

    return (
        <div className="space-y-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-[#474747] p-2 rounded w-full text-[#474747]"
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border border-[#474747] p-2 rounded w-full h-50 text-[#474747]"
            />
            <button onClick={handleUpdate} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer">
                Update Post
            </button>
        </div>
    );
};
