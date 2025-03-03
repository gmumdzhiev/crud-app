import React, { useState } from "react";
import {IProps} from "./IProps.ts";

export const Create= ({ onCreate }:IProps) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(title, body);
        setTitle("");
        setBody("");
        console.log('submitted')
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full"
                required
            />
            <textarea
                placeholder="Post body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border p-2 rounded w-full h-32"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Create Post
            </button>
        </form>
    );
};
