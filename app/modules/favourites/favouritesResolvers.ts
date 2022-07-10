import { IFavoriteMutation } from './favourites.model';

const favoriteResolver = {
    Query: {
        getAllFavorite: (_: any, __: any, { dataSources, token }: any) => {
            return dataSources.FavoriteApi.getAllFavorite(token);
        },
    },
    Mutation: {
        createFavorite: async (
            _: any,
            { FavoriteData }: { FavoriteData: IFavoriteMutation },
            { dataSources, token }: any
        ) => {
            try {
                const newFavorite = await dataSources.FavoriteApi.createFavorite({ ...FavoriteData }, token);
                console.log(newFavorite);
                return {
                    code: 203,
                    success: true,
                    message: 'Favorite created successfully!',
                    Favorite: newFavorite,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    Favorite: null,
                };
            }
        },
        deleteFavorite: async (
            _: any,
            { FavoriteData }: { FavoriteData: IFavoriteMutation },
            { dataSources, token }: any
        ) => {
            try {
                const deleteData = await dataSources.FavoriteApi.deleteFavorite({ ...FavoriteData }, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Favorite remove successfully!',
                    Favorite: deleteData,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    deleteData: null,
                };
            }
        },
    },
};

export default favoriteResolver;
