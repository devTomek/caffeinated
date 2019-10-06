import { IUsers, IUser } from "../interfaces/userInterface";

const disablePassword = (user: any): IUser => ({
    _id: user._id,
    email: user.email,
    password: ""
});

const disablePasswords = (users: any): IUsers =>
    users.map((user: IUser) => disablePassword(user));

const resolversUtils = {
    disablePassword,
    disablePasswords
};

export default resolversUtils;
