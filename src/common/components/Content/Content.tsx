import React, { useState, useEffect } from 'react';
import { faPlus, faPen, faTrash, faSearch, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Pagination} from "../Pagination/Pagination.tsx";
import {IPost} from "./interfaces/IPost.ts";


export const Content = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [search, setSearch] = useState<string>('');
    const [expandedPost, setExpandedPost] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const postsPerPage = 10;

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = (currentPage - 1) * postsPerPage;
    const displayedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    const handlePostToggle = (id: number) => {
        setExpandedPost(prev => (prev === id ? null : id));
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(post => post.id !== id));
        }
    };



    return (
        <div className="flex-1 bg-white p-4 ml-[25%]">
            <div className="flex mb-4">
                <button className="bg-[#ebe8e8] text-[#474747] w-[50px] h-[50px] rounded mr-2">
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
                {displayedPosts.map(post => (
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


                        <div className="mt-2 flex justify-end space-x-2">
                            <FontAwesomeIcon
                                icon={faChevronUp}
                                className={` ml-2 transition-transform duration-300 ${expandedPost === post.id ? 'rotate-180' : ''}`}
                            />
                            <button className="bg-[#ebe8e8] text-[#474747] w-[50px] h-[50px] rounded">
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button
                                className="bg-[#e6a5a5] text-[#fa0000] w-[50px] h-[50px] rounded"
                                onClick={() => handleDelete(post.id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>


                ))}
                <Pagination postsPerPage={postsPerPage} filteredPosts={filteredPosts} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    );
};
