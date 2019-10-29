import { IAuthUserArgs, IAuthUser, Req } from "../interfaces/userInterface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel";

const login = async (args: IAuthUserArgs): Promise<Error | IAuthUser> => {
    const user: any = await UserModel.findOne({ email: args.email });
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordEqual: boolean = await bcrypt.compare(
        args.password,
        user.password
    );
    if (!isPasswordEqual) {
        throw new Error("Incorrect password");
    }

    type SignData = {
        _id: string;
        email: string;
    };
    const signData: SignData = {
        _id: user._id,
        email: user.email
    };
    const expiresIn: number = 15;
    type Options = {
        expiresIn: string;
    };
    const options: Options = {
        expiresIn: `${expiresIn}m`
    };
    const secret: string | any = process.env.JWT_SECRET;
    const token: string = jwt.sign(signData, secret, options);

    return {
        _id: user._id,
        token: token,
        expirationDate: expiresIn
    };
};

const throwErrorWhenUnauthorized = (req: Req): Error | void => {
    if (!req.isAuth) {
        throw new Error("Unauthorized");
    }
};

const authResolvers = {
    login,
    throwErrorWhenUnauthorized
};

export default authResolvers;
