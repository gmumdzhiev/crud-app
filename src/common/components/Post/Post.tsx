import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faEnvelope, faGlobe, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {IProps} from "./IProps.ts";
import {useState} from "react";
import {IPost} from "../Content/interfaces/IPost.ts";


export const Post = ({post, user, setPostToEdit,setIsEditDrawerOpen, setPostToDelete, setIsModalOpen}:IProps) => {
    const [expandedPost, setExpandedPost] = useState<string | null>(null);

    const handlePostToggle = (id: string) => {
        setExpandedPost(prev => (prev === id ? null : id));
    };

    const getUserAvatar = (userId: number, avatarUrl?: string) => {
        return avatarUrl ? avatarUrl : `/avatars/user-${userId}.jpg`;
    };

    const handleEditPost = (post: IPost) => {
        setPostToEdit(post);
        setIsEditDrawerOpen(true);
    };

    const handleDeleteRequest = (postId: string) => {
        setPostToDelete(postId);
        setIsModalOpen(true);
    };



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
                        <img
                            alt="User Avatar"
                            className="w-14 h-14 rounded-full mr-4 object-cover"
                            src={getUserAvatar(user.id, user.avatar)}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/avatars/user-default.jpg';
                            }}
                        />
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
                        <button
                            className="bg-[#ebe8e8] text-[#474747] hover:bg-[#c1d9f7] hover:text-[#2f89fc] hover:cursor-pointer w-[50px] h-[50px] rounded"
                            onClick={() => handleEditPost(post)}
                        >
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
    )
}