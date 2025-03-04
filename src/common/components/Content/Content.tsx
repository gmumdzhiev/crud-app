import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {faPlus, faPen, faTrash, faSearch, faChevronUp, faEnvelope, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "../Pagination/Pagination.tsx";
import { IPost } from "./interfaces/IPost.ts";
import { Drawer } from "../Drawer/Drawer.tsx";
import { Create } from "../Create/Create.tsx";
import {AppDispatch, RootState} from "../../../app/store/store.ts";
import {GetPosts} from "../../utils/api/GET/GetPosts/GetPosts.ts";
import {addPost} from "../../utils/api/GET/GetPosts/slices/getPostsSlice.ts";
import {DeletePost} from "../../utils/api/DELETE/DeletePost/DeletePost.ts";
import {ConfirmationModal} from "../ConfirmationModal/ConfirmationModal.tsx";

export const Content = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: posts, status: isLoading, error } = useSelector((state: RootState) => state.posts);
    const { list: users } = useSelector((state: RootState) => state.users);
    const [search, setSearch] = useState<string>('');
    const [expandedPost, setExpandedPost] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    const postsPerPage = 10;

    const getUser = (userId: number) => users.find(user => user.id === userId);

    useEffect(() => {
        dispatch(GetPosts());
    }, [dispatch]);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = (currentPage - 1) * postsPerPage;
    const displayedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    const handlePostToggle = (id: string) => {
        setExpandedPost(prev => (prev === id ? null : id));
    };

    const handleCreatePost = (title: string, body: string) => {
        const newPost: IPost = {
            id: uuidv4(),
            title,
            body,
            userId: 1
        };
        dispatch(addPost(newPost));
        setIsDrawerOpen(false);
    };

    const handleDeleteRequest = (postId: string) => {
        setPostToDelete(postId);
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        if (postToDelete) {
            dispatch(DeletePost(postToDelete));
        }
        setIsModalOpen(false);
        setPostToDelete(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPostToDelete(null);
    };

    if (isLoading === "loading") {
        return <div>Loading posts...</div>;
    }

    if (isLoading === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex-1 bg-white p-4 ml-[0%] sm:ml-[4%] md:ml-[6%] lg:ml-[8%]">

        <div className="flex mb-4 mt-5">
                <button
                    className="bg-[#ebe8e8] text-[#474747] hover:bg-[#c1d9f7] hover:text-[#2f89fc] hover:cursor-pointer w-[50px] h-[50px] rounded mr-2"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <div className="relative w-full text-[#474747]">
                    <div className="flex items-center border-1 border-[#474747] rounded h-[50px]">
                        <FontAwesomeIcon icon={faSearch} className="ml-3 text-[#474747]" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full h-[50px] p-2 border-0 rounded pl-3 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
            <div>
                {displayedPosts.map(post => {
                    const user = getUser(post.userId);
                    return (
                        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800 cursor-pointer" onClick={() => handlePostToggle(post.id)}>
                                    {post.title}
                                </h2>
                                <FontAwesomeIcon
                                    icon={faChevronUp}
                                    className={`text-gray-500 transition-transform ${expandedPost === post.id ? 'rotate-180' : ''}`}
                                    onClick={() => handlePostToggle(post.id)}
                                />
                            </div>
                            {expandedPost === post.id && (
                                <p className="mt-2 text-gray-600">{post.body}</p>
                            )}
                            {user && (
                                <div className="mt-4 flex justify-between items-center text-sm text-gray-700 border-t pt-2">
                                    <div className="flex items-center">
                                        <img src={`/avatars/user-${user.id}.jpg`} alt="User Avatar"  className="w-14 h-14 rounded-full mr-4 object-cover" />
                                        <div>
                                            <p className="text-lg font-semibold italic border-b border-[#2f89fc]">{user.name}</p>
                                            <p className="flex items-center">
                                                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
                                                {user.email}
                                            </p>
                                            <p className="flex">
                                                <FontAwesomeIcon icon={faGlobe} className="mr-2 text-green-500" />
                                                <a href={`https://${user.website}`} target="_blank" className="underline">
                                                    {user.website}
                                                </a>
                                            </p>
                                        </div>
                                        </div>

                                    <div className="flex space-x-2">
                                        <button className="bg-[#ebe8e8] text-[#474747] hover:bg-[#c1d9f7] hover:text-[#2f89fc] hover:cursor-pointer w-[50px] h-[50px] rounded">
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button
                                            className="bg-[#e6a5a5] text-[#fa0000] hover:bg-[#fa0000] hover:text-[#fafafa] hover:cursor-pointer w-[50px] h-[50px] rounded"
                                            onClick={() => handleDeleteRequest(post.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                {displayedPosts.length === 0 && <div>No posts available</div>}
            </div>
            <Pagination postsPerPage={postsPerPage} filteredPosts={filteredPosts} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create New Post">
                <Create onCreate={handleCreatePost} />
            </Drawer>
            <ConfirmationModal isOpen={isModalOpen} onClose={handleCancel} onConfirm={handleDelete} message="Are you sure you want to delete this post?" />
        </div>
    );
};
