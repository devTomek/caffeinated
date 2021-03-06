const userSchema = `
    type User {
        _id: ID!,
        email: String!,
        password: String
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
    type DeleteUser {
        _id: String
    }
    type EditedUser {
        _id: String,
        email: String
    }
    type Mutation {
        createUser(email: String!, password: String!): User,
        deleteUser(_id: String!): DeleteUser,
        editUser(_id: String!, email: String): EditedUser
    }
`;

export default userSchema;
