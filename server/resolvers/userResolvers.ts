import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import {
    IUsers,
    IUser,
    IAuthUserArgs,
    IAuthUser
} from "../interfaces/userInterface";
import { Types, Document } from "mongoose";
import jwt from "jsonwebtoken";

const getUsers = async (): Promise<IUsers> => {
    const users: any = await UserModel.find();
    return disablePasswords(users);
};

const getUser = async (args: IUser): Promise<IUser> => {
    const userId: { _id: string } = {
        _id: args._id
    };
    const user: any = await UserModel.findOne(userId);
    return disablePassword(user);
};

const login = async (args: IAuthUserArgs): Promise<Error | IAuthUser> => {
    const user: any = await UserModel.findOne({ email: args.email });
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordEqual = await bcrypt.compare(args.password, user.password);
    if (!isPasswordEqual) {
        throw new Error("Incorrect password");
    }

    const signData = {
        _id: user._id,
        email: user.email
    };
    const expiresIn = 1;
    const options = {
        expiresIn: `${expiresIn}h`
    };
    const secret: string | any = process.env.JWT_SECRET;
    const token: string = jwt.sign(signData, secret, options);

    return {
        _id: user._id,
        token: token,
        expirationDate: expiresIn
    };
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

    const savedUser: IUser = await user.save();

    return disablePassword(savedUser);
};

const deleteUser = async (
    _id: Types.ObjectId
): Promise<Types.ObjectId | Error> => {
    const userExists = await UserModel.findOne({ _id });

    if (!userExists) {
        return new Error("User doesn't exist");
    }

    await UserModel.deleteOne({ _id });

    return _id;
};

const editUser = async (args: IUser): Promise<IUser | Error> => {
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

    return disablePassword(user);
};

const disablePasswords = (users: any): IUsers =>
    users.map((user: IUser) => ({
        _id: user._id,
        email: user.email,
        password: ""
    }));

const disablePassword = (user: any): IUser => ({
    _id: user._id,
    email: user.email,
    password: ""
});

const userResolvers = {
    user: getUser,
    users: getUsers,
    login: login,
    createUser: createUser,
    deleteUser: deleteUser,
    editUser: editUser
};

export default userResolvers;
