import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { faPlus, faPen, faTrash, faSearch, faChevronUp } from '@fortawesome/free-solid-svg-icons';
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
    const [search, setSearch] = useState<string>('');
    const [expandedPost, setExpandedPost] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    const postsPerPage = 10;

    console.log('posts', posts)

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
        <div className="flex-1 bg-white p-4 ml-[25%]">
            <div className="flex mb-4">
                <button
                    className="bg-[#ebe8e8] text-[#474747] w-[50px] h-[50px] rounded mr-2"
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
                {isLoading === "succeeded" && posts.length > 0 ? (
                    displayedPosts.map(post => (
                        <div key={post.id} className="flex justify-between mb-4 p-4 bg-white rounded shadow-md">
                            <div className="w-full flex items-center text-[#474747]">
                                <input type="checkbox" className="mr-2" />
                                <div className="flex items-center cursor-pointer" onClick={() => handlePostToggle(post.id)}>
                                    {post.title}
                                    {expandedPost === post.id && (
                                        <div>
                                            <hr className="my-2 border-t-[1px] border-[#474747]" />
                                            <p className="mt-2 text-[#474747]">{post.body}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-2 flex justify-end space-x-2 items-center">
                                <FontAwesomeIcon
                                    icon={faChevronUp}
                                    className={`ml-2 transition-transform duration-300 text-[#474747] ${expandedPost === post.id ? 'rotate-180' : ''}`}
                                />
                                <button className="bg-[#ebe8e8] text-[#474747] w-[50px] h-[50px] rounded">
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                    className="bg-[#e6a5a5] text-[#fa0000] w-[50px] h-[50px] rounded"
                                    onClick={() => handleDeleteRequest(post.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))
                ): (
                    <div>No posts available</div>
                )}
                <Pagination postsPerPage={postsPerPage} filteredPosts={filteredPosts} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Create New Post">
                <Create onCreate={handleCreatePost} />
            </Drawer>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCancel}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this post?"
            />
        </div>
    );
};
