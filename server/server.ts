import express from "express";
import db from "./db";
import graphqlHTTP from "express-graphql";
import rootSchema from "./schemas/rootSchema";
import rootResolver from "./resolvers/rootResolver";
import dotenv from "dotenv";
import authMiddleware from "./middleware/authMiddleware";
import cors from "cors";

dotenv.config();

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    methods: ["GET,POST,OPTIONS"]
};
// todo use this or cors
app.use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*");
    res.setHeader("Access-Controll-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Controll-Allow-Headers", "Content-Type");
    next();
});
app.use(cors(corsOptions));

app.use(authMiddleware);

app.use(
    "/graphql",
    graphqlHTTP({
        schema: rootSchema,
        rootValue: rootResolver,
        graphiql: process.env.NODE_ENV === "development"
    })
);

const runServer = async () => app.listen(process.env.SERVER_PORT);

db.connect()
    .then(() => console.log(`Connected to ${process.env.DB_NAME}`))
    .then(runServer)
    .then(() =>
        console.log(`Server running on port ${process.env.SERVER_PORT}`)
    )
    .catch(e => console.log(e));
