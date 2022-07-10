import { gql } from 'apollo-server';

const albumSchema = gql`
    type Query {
        ###Album
        "Get all Album"
        getAllAlbum(limit: Int, offset: Int): AllAlbumResponse
        "Get Album by id"
        getAlbumById(id: ID): Album
    }
    type Mutation {
        createAlbum(albumData: AlbumInput): CreateAlbumResponse
        updateAlbum(albumData: AlbumInput, id: ID!): CreateAlbumResponse
        deleteAlbum(id: ID!): DeleteResponse
    }
    type CreateAlbumResponse implements MutationResponse {
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "New Album"
        Album: Album
    }

    type AllAlbumResponse implements GetAllResponse {
        "Max items in response"
        limit: Int
        "offset?"
        offset: Int
        "Total items"
        total: Int
        "Array of Album"
        items: [Album]
    }
    type Album {
        _id: ID!
        name: String!
        released: Int
        artists: [Artist]
        bands: [Band]
        tracks: [Track]
        genres: [Genre]
        image: String
    }

    input AlbumInput {
        name: String!
        released: Int
        artists: [ArtistInput]
        bands: [BandInput]
        tracks: [TrackInput]
        genres: [GenreInput]
        image: String
    }
`;
export default albumSchema;
