export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
    isAdmin: boolean;
}

export interface UserCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
}