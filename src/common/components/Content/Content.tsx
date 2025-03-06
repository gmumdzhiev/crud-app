import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {faPlus,faSearch } from '@fortawesome/free-solid-svg-icons';
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
import {Edit} from "../Edit/Edit.tsx";
import {LoadingModal} from "../Modals/LoadingModal/LoadingModal.tsx";
import {ErrorModal} from "../Modals/ErrorModal/ErrorModal.tsx";
import {Post} from "../Post/Post.tsx";

export const Content = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: posts, status: isLoading, error } = useSelector((state: RootState) => state.posts);
    const { list: users } = useSelector((state: RootState) => state.users);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
    const [postToEdit, setPostToEdit] = useState<IPost | null>(null);

    const postsPerPage = 10;

    const getUser = (userId: number) => users.find(user => user.id === Number(userId));

    useEffect(() => {
        dispatch(GetPosts());
    }, [dispatch]);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = (currentPage - 1) * postsPerPage;
    const displayedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);


    const handleCreatePost = (title: string, body: string, userId: string | number) => {
        const userIdParsed = typeof userId === 'number' ? userId : parseInt(userId);

        const newPost: IPost = {
            id: uuidv4(),
            title,
            body,
            userId: userIdParsed,
        };

        dispatch(addPost(newPost));
        setIsDrawerOpen(false);
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

    if (isLoading === 'loading') {
        return <LoadingModal />;
    }

    if (isLoading === 'failed') {
        return <ErrorModal error={error} onClose={() => {}} />;
    }

    return (
        <div>
            <div className="flex mb-4">
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
                        <Post
                            post={post}
                            user={user}
                            setPostToEdit={setPostToEdit}
                            setIsEditDrawerOpen={setIsEditDrawerOpen}
                            setPostToDelete={setPostToDelete}
                            setIsModalOpen={setIsModalOpen}
                            />
                    );
                })}

                {displayedPosts.length === 0 && <div>No posts available</div>}
            </div>
            <Pagination postsPerPage={postsPerPage} filteredPosts={filteredPosts} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <Drawer
                isOpen={isDrawerOpen || isEditDrawerOpen}
                onClose={() => {
                    setIsDrawerOpen(false);
                    setIsEditDrawerOpen(false);
                }}
                title={isEditDrawerOpen ? "Edit Post" : "Create New Post"}
            >
                {isEditDrawerOpen ? (
                    postToEdit && <Edit post={postToEdit} onClose={() => setIsEditDrawerOpen(false)} />
                ) : (
                    <Create onCreate={handleCreatePost} />
                )}
            </Drawer>


            <ConfirmationModal isOpen={isModalOpen} onClose={handleCancel} onConfirm={handleDelete} message="Are you sure you want to delete this post?" />
        </div>
    );
};
