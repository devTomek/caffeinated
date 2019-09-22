import express from "express";
import db from "./db";
import graphqlHTTP from "express-graphql";
import rootSchema from "./schemas/rootSchema";
import rootResolver from "./resolvers/rootResolver";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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
