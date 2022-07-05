import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        "Query to get tracks array for the homepage grid"
        tracksForHome: [Track!]!
        "Fetch a specific track, provided a track's ID"
        track(id: ID!): Track!
    }

    type Artist {
        id: ID!
        firstName: String
        secondName: String
        middleName: String
        birthDate: String
        birthPlace: String
        country: String
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
        id: ID!
        firstName: String
        secondName: String
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
`;
