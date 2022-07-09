import { ApolloServer } from 'apollo-server';
import { typeDefs } from './app/schema';
import { resolvers } from './app/resovers';
import { Users } from './app/datasources/users';
import 'dotenv/config';
import { AuthenticationError } from 'apollo-server-express';
import { verifyUser } from './app/utils/verifyUser';
import { IVerifyData } from './app/models/user.model';

const port = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            UserApi: new Users(),
        };
    },
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        if (token) {
            const { data }: { data: IVerifyData } = await verifyUser(token).catch((error) => {
                throw new AuthenticationError(error.message);
            });
            return { data };
        }
    },
});

server.listen({ port }).then(() => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Query at https://studio.apollographql.com/dev
  `);
});
