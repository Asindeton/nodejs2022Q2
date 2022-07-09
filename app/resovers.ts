import { ILoinUser, IRegisterUser } from './models/user.model';
import { ICreateArtist } from './models/artist.model';
import { AuthenticationError } from 'apollo-server-express';
import { ERROR_MESSAGE } from './config/develop.config';

export const resolvers = {
    Query: {
        // Users
        getUserById: (_: any, { id }: { id: string }, { dataSources }: any) => {
            return dataSources.UserApi.getUserById(id);
        },
        loginUser: (_: any, loginUser: ILoinUser, { dataSources }: any) => {
            return dataSources.UserApi.loginUser(loginUser);
        },
        verifyUser: (_: any, { token }: { token: string }, { dataSources }: any) => {
            return dataSources.UserApi.verifyUser(token);
        },

        // Artists
        getAllArtists: (_: any, { limit, offset }: { limit: number; offset: number }, { dataSources }: any) => {
            return dataSources.ArtistsApi.getAllArtists(limit, offset);
        },
        getArtistById: (_: any, { id }: { id: string }, { dataSources }: any) => {
            return dataSources.ArtistsApi.getArtistById(id);
        },
    },
    Mutation: {
        registerUser: async (_: any, { userData }: { userData: IRegisterUser }, { dataSources }: any) => {
            try {
                const newUser = await dataSources.UserApi.registerUser({ ...userData });
                console.log(newUser);
                return {
                    code: 203,
                    success: true,
                    message: 'User register successfully !',
                    user: newUser,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    user: null,
                };
            }
        },
        createArtist: async (
            _: any,
            { artistData }: { artistData: ICreateArtist },
            { dataSources, __, token }: any
        ) => {
            try {
                const newArtist = await dataSources.ArtistsApi.createArtist({ ...artistData }, token);
                return {
                    code: 203,
                    success: true,
                    message: 'Artist created successfully!',
                    artist: newArtist,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    artist: null,
                };
            }
        },
    },
};
