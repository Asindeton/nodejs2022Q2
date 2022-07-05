import { ApolloServer } from 'apollo-server';
import { typeDefs } from './app/schema';
import { resolvers } from './app/resovers';
import { TrackAPI } from './app/datasources/track-api';
import 'dotenv/config';

const port = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            trackAPI: new TrackAPI(),
        };
    },
});

server.listen({ port }).then(() => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
