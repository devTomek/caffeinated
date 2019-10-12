import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import { IUsers, IUser, Req } from "../interfaces/userInterface";
import { Types, Document } from "mongoose";
import resolversUtils from "./resolversUtils";
import authResolvers from "./authResolvers";

const getUsers = async (args: any, req: Req): Promise<IUsers | Error> => {
    // todo uncomment this
    // authResolvers.throwErrorWhenUnauthorized(req);

    const users: any = await UserModel.find();
    return resolversUtils.disablePasswords(users);
};

const getUser = async (args: IUser, req: Req): Promise<IUser | Error> => {
    authResolvers.throwErrorWhenUnauthorized(req);

    const userId: { _id: string } = {
        _id: args._id
    };
    const user: any = await UserModel.findOne(userId);
    return resolversUtils.disablePassword(user);
};

const createUser = async (args: IUser, req: Req): Promise<IUser | Error> => {
    authResolvers.throwErrorWhenUnauthorized(req);

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

    const savedUser: IUser = await user.save();

    return resolversUtils.disablePassword(savedUser);
};

const deleteUser = async (
    _id: Types.ObjectId,
    req: Req
): Promise<Types.ObjectId | Error> => {
    authResolvers.throwErrorWhenUnauthorized(req);

    const userExists = await UserModel.findOne({ _id });

    if (!userExists) {
        return new Error("User doesn't exist");
    }

    await UserModel.deleteOne({ _id });

    return _id;
};

const editUser = async (args: IUser, req: Req): Promise<IUser | Error> => {
    authResolvers.throwErrorWhenUnauthorized(req);

    const filter: { _id: string } = { _id: args._id };
    const email: string = args.email ? args.email : "";
    const password: string = args.password ? args.password : "";
    const encryptedPassword: string = await bcrypt.hash(password, 10);
    const update: { email: string; password: string } = {
        email,
        password: encryptedPassword
    };

    if (!email && !password) {
        throw new Error("No data provided");
    }

    await UserModel.findOneAndUpdate(filter, update);

    const user: Document | null = await UserModel.findOne(filter);

    if (!user) {
        throw new Error("No user found");
    }

    return resolversUtils.disablePassword(user);
};

const userResolvers = {
    user: getUser,
    users: getUsers,
    createUser: createUser,
    deleteUser: deleteUser,
    editUser: editUser
};

export default userResolvers;
