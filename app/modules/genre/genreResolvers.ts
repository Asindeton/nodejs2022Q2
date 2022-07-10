import { ICreateGenre } from './genre.model';

const genreResolver = {
    Query: {
        getAllGenre: (_: any, { limit, offset }: { limit: number; offset: number }, { dataSources }: any) => {
            return dataSources.GenreApi.getAllGenre(limit, offset);
        },
        getGenreById: (_: any, { id }: { id: string }, { dataSources }: any) => {
            return dataSources.GenreApi.getGenreById(id);
        },
    },
    Mutation: {
        createGenre: async (_: any, { genreData }: { genreData: ICreateGenre }, { dataSources, token }: any) => {
            try {
                const newGenre = await dataSources.GenreApi.createGenre({ ...genreData }, token);
                return {
                    code: 203,
                    success: true,
                    message: 'Band created successfully!',
                    genre: newGenre,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    genre: null,
                };
            }
        },
        updateGenre: async (
            _: any,
            { genreData, id }: { genreData: ICreateGenre; id: string },
            { dataSources, token }: any
        ) => {
            try {
                const updatedGenre = await dataSources.GenreApi.updateGenre(id, { ...genreData }, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Band update successfully!',
                    genre: updatedGenre,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    genre: null,
                };
            }
        },
        deleteGenre: async (_: any, { id }: { id: string }, { dataSources, token }: any) => {
            try {
                const deleteData = await dataSources.GenreApi.deleteGenre(id, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Genre delete successfully!',
                    deleteData,
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

export default genreResolver;
