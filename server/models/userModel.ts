import { Schema, model } from "mongoose";

const userSchema = new Schema({
    _id: Schema.Types.String,
    email: Schema.Types.String,
    password: Schema.Types.String
});

const UserModel = model("User", userSchema);

export default UserModel;
