export interface RegisterPayload {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    emailOrUserName: string;
    password: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TokenPayload {
    id: string;
    userName: string;
    fingerprint: string;
    userAgent: string;
}

export interface Acknowledgement {
    message: string;
}
