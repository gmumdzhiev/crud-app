export interface IGetPost{
    postId: string;
}

export interface IAPIResponsePost{
    userId: number,
    id: number,
    title: string,
    body: string
}

export interface IGetPostErrorHandle {
    message: string
}