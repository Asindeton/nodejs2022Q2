import { IRegisterUser } from './models/user.model';

export const resolvers = {
    Query: {
        // returns an array of Tracks that will be used to populate the homepage grid of our web client
        tracksForHome: (_: any, __: any, { dataSources }: any) => {
            return dataSources.UserAPI.getTracksForHome();
        },

        // // get a single track by ID, for the track page
        // track: (_: any, { id }: { id: string }, { dataSources }) => {
        //     return dataSources.trackAPI.getTrack(id);
        // },
    },
    Mutation: {
        registerUser: async (_: any, registerUserData: IRegisterUser, { dataSources }: any) => {
            try {
                const newUser = await dataSources.UserApi.registerUser({ ...registerUserData });
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
    },
};
