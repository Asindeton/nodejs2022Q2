import { gql } from 'apollo-server';

const sharedSchema = gql`
    interface MutationResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
    }
    interface GetAllResponse {
        "Max items in response"
        limit: Int
        "offset?"
        offset: Int
        "Total items"
        total: Int
    }
    type DeleteResponse implements MutationResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Human-readable message for the UI"
        message: String!
        "Indicates whether the mutation was successful"
        success: Boolean!

        deleteData: DeleteData
    }
    type DeleteData {
        acknowledged: Boolean
        deletedCount: Int
    }
`;

export default sharedSchema;
