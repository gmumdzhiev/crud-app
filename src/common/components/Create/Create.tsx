import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store/store.ts";
import { GetUsers } from "../../utils/api/GET/GetUsers/GetUsers.ts";

export const Create = ({ onCreate }: { onCreate: (title: string, body: string, userId: number) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: users, status } = useSelector((state: RootState) => state.users);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(GetUsers());
        }
    }, [dispatch, status]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert("Please select a user.");
            return;
        }
        onCreate(title, body, userId);
        setTitle("");
        setBody("");
        setUserId(null);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <select
                value={userId || ""}
                onChange={(e) => setUserId(Number(e.target.value))}
                className="border border-[#474747] p-2 rounded w-full text-[#474747]"
                required
            >
                <option value="" disabled>Select a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-[#474747] p-2 rounded w-full text-[#474747]"
                required
            />

            <textarea
                placeholder="Post body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border border-[#474747] p-2 rounded w-full h-32 text-[#474747]"
                required
            />

            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer">
                Create Post
            </button>
        </form>
    );
};
