import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import { IUsers, IUser, IUserId } from "../interfaces/userInterface";
import { Types } from "mongoose";

const getUsers = async (): Promise<IUsers> => {
    const users: any = await UserModel.find();
    return disablePasswords(users);
};

const getUser = async (args: IUser): Promise<IUser> => {
    const userId: IUserId = {
        _id: args._id
    };
    const user: any = await UserModel.findOne(userId);
    return disablePassword(user);
};

const createUser = async (args: IUser): Promise<IUser | Error> => {
    const userExists = await UserModel.findOne({ email: args.email });
    const passwordExists = args.password;

    if (userExists) {
        return new Error("User already exists");
    }

    if (!passwordExists) {
        return new Error("No password provided");
    }

    const user: any = new UserModel({
        _id: Types.ObjectId(),
        email: args.email,
        password: await bcrypt.hash(args.password, 10)
    });

    const savedUser = await user.save();

    return disablePassword(savedUser);
};

const deleteUser = async (_id: IUserId): Promise<IUserId | Error> => {
    const userExists = await UserModel.findOne({ _id });

    if (!userExists) {
        return new Error("User doesn't exist");
    }

    await UserModel.deleteOne({ _id });

    return _id;
};

const disablePasswords = (users: IUsers): IUsers =>
    users.map((user: IUser) => ({
        _id: user._id,
        email: user.email,
        password: ""
    }));

const disablePassword = (user: IUser): IUser => ({
    _id: user._id,
    email: user.email,
    password: ""
});

const usersResolvers = {
    user: getUser,
    users: getUsers,
    createUser: createUser,
    deleteUser: deleteUser
};

export default usersResolvers;
