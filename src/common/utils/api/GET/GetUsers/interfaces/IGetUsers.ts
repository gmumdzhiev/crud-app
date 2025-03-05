export interface IGetUsers {
    avatar?: string;
    id: number;
    name: string;
    email?: string;
    username?: string;
    website?: string;
}

export interface IGetUsersErrorHandle {
    message: string
}