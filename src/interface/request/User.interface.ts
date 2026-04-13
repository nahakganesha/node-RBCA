export interface IRegisterUser {
    email: string;
    username: string;
    phone: string;
    password: string;
    status: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}