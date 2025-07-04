export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
}

export interface UserCreate {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
}