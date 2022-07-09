import { ILoinUser, IRegisterUser } from './user.model';

const userResolvers = {
    Query: {
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
    },
};

export default userResolvers;
