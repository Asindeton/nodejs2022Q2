import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        ###User
        "Get user by ID"
        getUserById(id: ID!): User
        "Authentication user"
        loginUser(email: String, password: String): Jwt
        "Check JWT token"
        verifyUser(token: String): User

        ###Artists
        "Get all artists"
        getAllArtists(limit: Int, offset: Int): AllArtistsResponse
        "Get arist by id"
        getArtistById(id: ID): Artist
    }

    type Mutation {
        registerUser(userData: UserCreate): RegisterUserResponse
        createArtist(artistData: ArtistCreat): CreateArtistResponse
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
    type CreateArtistResponse implements MutationResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        artist: Artist
    }
    interface MutationResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
    }

    type AllArtistsResponse implements GetAllResponse {
        "Max items in response"
        limit: Int
        "offset?"
        offset: Int
        "Total items"
        total: Int
        "Array of Artists"
        items: [Artist]
    }

    interface GetAllResponse {
        "Max items in response"
        limit: Int
        "offset?"
        offset: Int
        "Total items"
        total: Int
    }

    type Artist {
        _id: ID!
        firstName: String!
        secondName: String!
        middleName: String
        birthDate: String
        birthPlace: String
        country: String!
        bands: [Band]
        instruments: [String]
    }

    type Band {
        id: ID!
        name: String
        origin: String
        members: [Member]
        website: String
        genres: [Genre]
    }
    type Genre {
        id: ID!
        name: String
        description: String
        country: String
        year: Int
    }
    type Favourites {
        id: ID!
        userId: ID
        bands: [Band]
        genres: [Genre]
        artists: [Artist]
        tracks: [Track]
    }
    type Album {
        id: ID!
        name: String
        released: Int
        artists: [Artist]
        bands: [Band]
        tracks: [Track]
        genres: [Genre]
        image: String
    }
    type User {
        _id: ID!
        firstName: String
        lastName: String
        password: String
        email: String!
    }
    type Track {
        id: ID!
        title: String!
        album: Album
        artists: [Artist]
        bands: [Band]
        duration: Int
        released: Int
        genres: [Genre]
    }
    type Member {
        id: ID!
        firstName: String
        secondName: String
        middleName: String
        instrument: String
        years: [String]
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
    input ArtistCreat {
        firstName: String!
        secondName: String!
        middleName: String
        birthDate: String
        birthPlace: String
        country: String!
        bands: [BandCreate]
        instruments: [String]
    }
    input BandCreate {
        name: String!
        origin: String
        members: [MemberCreate]
        website: String
        genres: [GenreCreate]
    }
    input MemberCreate {
        artist: String
        instrument: String
        years: [String]
    }
    input GenreCreate {
        name: String!
        description: String
        country: String
        year: Int
    }
`;
