import mongoose from "mongoose";

const connect = async () => {
    const {
        DB_HOST,
        DB_NAME,
        DB_PORT,
        DB_LOGIN,
        DB_PASSWORD,
        DB_AUTH_SOURCE
    } = process.env;

    return await mongoose.connect(
        `mongodb://${DB_LOGIN}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTH_SOURCE}`,
        { useNewUrlParser: true }
    );
};

const db = { connect };

export default db;
