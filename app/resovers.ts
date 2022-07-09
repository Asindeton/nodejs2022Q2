import { ILoinUser, IRegisterUser } from './models/user.model';

export const resolvers = {
    Query: {
        // get user by id
        getUserById: (_: any, { id }: { id: string }, { dataSources }: any) => {
            return dataSources.UserApi.getUserById(id);
        },
        loginUser: (_: any, loginUser: ILoinUser, { dataSources }: any) => {
            return dataSources.UserApi.loginUser(loginUser);
        },
        verifyUser: (_: any, { token }: { token: string }, { dataSources }: any) => {
            return dataSources.UserApi.verifyUser(token);
        },
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
