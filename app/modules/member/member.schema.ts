import { gql } from 'apollo-server';

const memberSchema = gql`
    type Member {
        id: ID!
        firstName: String
        secondName: String
        middleName: String
        instrument: String
        years: [String]
    }

    input MemberInput {
        artist: ID!
        instrument: String
        years: [String]
    }
`;

export default memberSchema;
