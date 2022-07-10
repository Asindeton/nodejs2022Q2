import { ApolloServer } from 'apollo-server';
import typeDefs from './app/modules/schema';
import resolvers from './app/modules/resolvers';
import 'dotenv/config';

import dataSources from './app/modules/dataSources';

const port = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        return { token };
    },
});

server.listen({ port }).then(() => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Query at https://studio.apollographql.com/dev
  `);
});
