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

const FRONTEND_ORIGIN = "http://localhost:3000";
const corsOptions = {
    origin: FRONTEND_ORIGIN
};
app.use(cors(corsOptions));

app.use(authMiddleware);

app.use(
    "/graphql",
    graphqlHTTP({
        schema: rootSchema,
        rootValue: rootResolver
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
