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

    ### Inputs
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

    input GenreInput {
        name: String!
        description: String
        country: String
        year: Int
    }
`;
export default artistSchema;
