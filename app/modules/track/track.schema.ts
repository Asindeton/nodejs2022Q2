import { gql } from 'apollo-server';

const trackSchema = gql`
    type Query {
        ###Track
        "Get all Track"
        getAllTrack(limit: Int, offset: Int): AllTrackResponse
        "Get Track by id"
        getTrackById(id: ID): Track
    }
    type Mutation {
        createTrack(trackData: TrackInput): CreateTrackResponse
        updateTrack(trackData: TrackInput, id: ID!): CreateTrackResponse
        deleteTrack(id: ID!): DeleteResponse
    }
    type CreateTrackResponse implements MutationResponse {
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "New Track"
        track: Track
    }

    type AllTrackResponse implements GetAllResponse {
        "Max items in response"
        limit: Int
        "offset?"
        offset: Int
        "Total items"
        total: Int
        "Array of Track"
        items: [Track]
    }

    type Track {
        _id: ID!
        title: String!
        albumId: ID
        artists: [Artist]
        bands: [Band]
        duration: Int
        released: Int
        genres: [Genre]
    }

    input TrackInput {
        title: String!
        albumId: ID
        artists: [ArtistInput]
        bands: [BandInput]
        duration: Int
        released: Int
        genres: [GenreInput]
    }
`;

export default trackSchema;
