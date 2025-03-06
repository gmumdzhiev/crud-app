import {IPost} from "../Content/interfaces/IPost.ts";
import {IGetUsers} from "../../utils/api/GET/GetUsers/interfaces/IGetUsers.ts";

export interface IProps {
    post: IPost,
    user: IGetUsers | undefined
    setPostToEdit: (post: IPost) => void,
    setIsEditDrawerOpen: (isEditDrawerOpen: boolean) => void
    setPostToDelete: (postId: string) => void,
    setIsModalOpen: (isModalOpen: boolean) => void
}