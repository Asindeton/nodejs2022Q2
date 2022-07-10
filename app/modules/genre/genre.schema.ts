import { gql } from 'apollo-server';

const genreSchema = gql`
    type Query {
        ###Bands
        "Get all genres"
        getAllGenre(limit: Int, offset: Int): AllGenreResponse
        "Get genre by id"
        getGenreById(id: ID): Genre
    }
    type Mutation {
        createGenre(genreData: GenreInput): CreateGenreResponse
        updateGenre(genreData: GenreInput, id: ID!): CreateGenreResponse
        deleteGenre(id: ID!): DeleteResponse
    }
    type CreateGenreResponse implements MutationResponse {
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "New Genre"
        genre: Genre
    }

    type AllGenreResponse implements GetAllResponse {
        "Max items in response"
        limit: Int
        "offset?"
        offset: Int
        "Total items"
        total: Int
        "Array of Genre"
        items: [Genre]
    }

    type Genre {
        _id: ID!
        name: String
        description: String
        country: String
        year: Int
    }

    input GenreInput {
        name: String!
        description: String
        country: String
        year: Int
    }
`;

export default genreSchema;
