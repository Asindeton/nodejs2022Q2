import { gql } from 'apollo-server';

const bandSchema = gql`
    type Query {
        ###Bands
        "Get all bands"
        getAllBands(limit: Int, offset: Int): AllBandResponse
        "Get bands by id"
        getBandById(id: ID): Band
    }
    type Mutation {
        createBand(bandData: BandInput): CreateBandResponse
        updateBand(bandData: BandInput, id: ID!): CreateBandResponse
        deleteBand(id: ID!): DeleteResponse
    }
    type CreateBandResponse implements MutationResponse {
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "New Band"
        band: Band
    }
    type DeleteBandResponse implements MutationResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Human-readable message for the UI"
        message: String!
        "Indicates whether the mutation was successful"
        success: Boolean!
    }
    type AllBandResponse implements GetAllResponse {
        "Max items in response"
        limit: Int
        "offset?"
        offset: Int
        "Total items"
        total: Int
        "Array of Artists"
        items: [Band]
    }

    type Band {
        _id: ID!
        name: String!
        origin: String
        members: [Member]
        website: String
        genres: [Genre]
    }
    input BandInput {
        name: String!
        origin: String
        members: [MemberInput]
        website: String
        genres: [GenreInput]
    }
`;

export default bandSchema;
