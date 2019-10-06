const userSchema = `
    type User {
        _id: ID!,
        email: String!,
        password: String!
    }
    type AuthUser {
        _id: ID!,
        token: String!,
        expirationDate: Int!
    }
    type Query {
        users: [User!]!,
        user(_id: ID!): User,
        login(email: String!, password: String!): AuthUser!
    }
    type Mutation {
        createUser(email: String!, password: String!): User,
        deleteUser(_id: ID!): User,
        editUser(_id: ID!, email: String, password: String): User
    }
`;

export default userSchema;
