const userSchema = `
    type User {
        _id: ID!,
        email: String!,
        password: String!
    }
    type Query {
        users: [User!],
        user(_id: ID!): User
    }
    type Mutation {
        createUser(email: String!, password: String!): User
    }
`;

export default userSchema;
