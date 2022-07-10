import { gql } from 'apollo-server';

const favouritesSchema = gql`
    type Query {
        ###Favorite
        "Get all Favorite"
        getAllFavorite: Favorite
    }
    type Mutation {
        createFavorite(FavoriteData: FavoriteInput): CreateFavoriteResponse
        deleteFavorite(FavoriteData: FavoriteInput): CreateFavoriteResponse
    }
    type CreateFavoriteResponse implements MutationResponse {
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "New Favorite"
        Favorite: Favorite
    }

    type Favorite {
        _id: ID!
        userId: ID!
        bandsIds: [ID]
        genresIds: [ID]
        artistsIds: [ID]
        tracksIds: [ID]
    }

    input FavoriteInput {
        id: ID!
        type: FavoriteType
    }
    enum FavoriteType {
        bands
        genres
        artists
        tracks
    }
`;
export default favouritesSchema;
