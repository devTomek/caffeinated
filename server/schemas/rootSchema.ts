import { buildSchema } from "graphql";
import userSchema from "./userSchema";

const rootSchema = buildSchema(`
    ${userSchema}
`);

export default rootSchema;
