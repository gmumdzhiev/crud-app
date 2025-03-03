import {IPost} from "../Content/interfaces/IPost.ts";

export interface IProps {
    postsPerPage: number;
    filteredPosts: IPost[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
