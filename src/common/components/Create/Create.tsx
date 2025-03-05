import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store/store.ts";
import { GetUsers } from "../../utils/api/GET/GetUsers/GetUsers.ts";
import { addUser } from "../../utils/api/GET/GetUsers/slices/getUsersSlice.ts";
import { IGetUsers } from "../../utils/api/GET/GetUsers/interfaces/IGetUsers.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Create = ({ onCreate }: { onCreate: (title: string, body: string, userId: string) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: users, status } = useSelector((state: RootState) => state.users);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState<number | null>(null);
    const [isNewUser, setIsNewUser] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (status === "idle") {
            dispatch(GetUsers());
        }
    }, [dispatch, status]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let finalUserId = userId;

        if (isNewUser) {
            if (!firstName || !lastName) {
                toast.error("First name and last name are required for new users.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }

            const newUserId = Date.now();

            const newUser: IGetUsers = {
                id: newUserId,
                name: `${firstName} ${lastName}`,
                email,
                website,
                avatar,
            };

            dispatch(addUser(newUser));
            finalUserId = newUserId;

            toast.success("New user created successfully!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if (!finalUserId) {
            toast.error("Please select or create a user.", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        onCreate(title, body, finalUserId.toString());

        toast.success("Post created successfully!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setTitle("");
        setBody("");
        setUserId(null);
        setIsNewUser(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setWebsite("");
        setAvatar("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label className="flex items-center space-x-2">
                <input type="checkbox" checked={isNewUser} onChange={() => setIsNewUser(!isNewUser)} />
                <span>Create New User</span>
            </label>

            {isNewUser ? (
                <>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border border-[#474747] p-2 rounded w-full text-[#474747]"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border border-[#474747] p-2 rounded w-full text-[#474747]"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-[#474747] p-2 rounded w-full text-[#474747]"
                    />
                    <input
                        type="text"
                        placeholder="Website (optional)"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="border border-[#474747] p-2 rounded w-full text-[#474747]"
                    />
                    <input
                        type="text"
                        placeholder="Avatar URL (optional)"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className="border border-[#474747] p-2 rounded w-full text-[#474747]"
                    />
                </>
            ) : (
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
            )}

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
