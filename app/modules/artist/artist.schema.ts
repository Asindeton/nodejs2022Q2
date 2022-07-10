import { gql } from 'apollo-server';

const artistSchema = gql`
    type Query {
        ###Artists
        "Get all artists"
        getAllArtists(limit: Int, offset: Int): AllArtistsResponse
        "Get arist by id"
        getArtistById(id: ID): Artist
    }

    type Mutation {
        createArtist(artistData: ArtistInput): CreateArtistResponse
        updateArtist(artistData: ArtistInput, id: ID!): CreateArtistResponse
        deleteArtist(id: ID!): DeleteResponse
    }

    type CreateArtistResponse implements MutationResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Response data"
        artist: Artist
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

    type Favourites {
        id: ID!
        userId: ID
        bands: [Band]
        genres: [Genre]
        artists: [Artist]
        tracks: [Track]
    }

    input ArtistInput {
        firstName: String!
        secondName: String!
        middleName: String
        birthDate: String
        birthPlace: String
        country: String!
        bands: [BandInput]
        instruments: [String]
    }
`;
export default artistSchema;
