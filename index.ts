import { ApolloServer } from 'apollo-server';
import { typeDefs } from './app/schema';
import { resolvers } from './app/resovers';
import { Users } from './app/datasources/users';
import 'dotenv/config';

const port = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            UserApi: new Users(),
        };
    },
});

server.listen({ port }).then(() => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Query at https://studio.apollographql.com/dev
  `);
});
