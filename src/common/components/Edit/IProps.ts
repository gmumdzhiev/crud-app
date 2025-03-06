import {IPost} from "../Content/interfaces/IPost.ts";

export interface IProps {
    post: IPost;
    onClose: () => void;
}