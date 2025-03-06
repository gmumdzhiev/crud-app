import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store/store.ts";
import { IPost } from "../Content/interfaces/IPost.ts";
import {updatePost} from "../../utils/api/UPDATE/updatePost/updatePost.ts";

interface EditProps {
    post: IPost;
    onClose: () => void;
}

export const Edit = ({ post, onClose }: EditProps) => {
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
        <div>
            <h2 className="text-lg font-semibold mb-4">Edit Post</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
            />
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Post
            </button>
        </div>
    );
};
