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

export interface Acknowledgement {
    message: string;
}
