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

export interface IUserId {
    _id: string;
}
