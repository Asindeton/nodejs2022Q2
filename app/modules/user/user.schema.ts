import { gql } from 'apollo-server';

export const userSchema = gql`
    type Query {
        ###User
        "Get user by ID"
        getUserById(id: ID!): User
        "Authentication user"
        loginUser(email: String, password: String): Jwt
        "Check JWT token"
        verifyUser(token: String): User
    }

    type Mutation {
        registerUser(userData: UserCreate): RegisterUserResponse
    }

    type RegisterUserResponse implements MutationResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Newly updated track after a successful mutation"
        user: User!
    }

    interface MutationResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
    }

    type User {
        _id: ID!
        firstName: String
        lastName: String
        password: String
        email: String!
    }

    type Jwt {
        jwt: String
    }

    input UserCreate {
        firstName: String!
        lastName: String!
        password: String!
        email: String!
    }
`;
