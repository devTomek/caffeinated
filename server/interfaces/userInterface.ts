export interface IUser {
    _id: string;
    email: string;
    password: string;
}

export interface IUsers {
    map: (
        arg0: (user: IUser) => { _id: string; email: string; password: string }
    ) => IUsers;
}

export interface IAuthUserArgs {
    email: string;
    password: string;
}

export interface IAuthUser {
    _id: string;
    token: string;
    expirationDate: number;
}

export interface Req {
    isAuth: boolean;
    userId: string;
    userEmail: string;
}
