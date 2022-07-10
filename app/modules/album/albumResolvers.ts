import { ICreateAlbum } from './album.model';

const albumResolver = {
    Query: {
        getAllAlbum: (_: any, { limit, offset }: { limit: number; offset: number }, { dataSources }: any) => {
            return dataSources.AlbumApi.getAllAlbum(limit, offset);
        },
        getAlbumById: (_: any, { id }: { id: string }, { dataSources }: any) => {
            return dataSources.AlbumApi.getAlbumById(id);
        },
    },
    Mutation: {
        createAlbum: async (_: any, { albumData }: { albumData: ICreateAlbum }, { dataSources, token }: any) => {
            try {
                const newAlbum = await dataSources.AlbumApi.createAlbum({ ...albumData }, token);
                return {
                    code: 203,
                    success: true,
                    message: 'Album created successfully!',
                    Album: newAlbum,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    Album: null,
                };
            }
        },
        updateAlbum: async (
            _: any,
            { albumData, id }: { albumData: ICreateAlbum; id: string },
            { dataSources, token }: any
        ) => {
            try {
                const updatedAlbum = await dataSources.AlbumApi.updateAlbum(id, { ...albumData }, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Album update successfully!',
                    Album: updatedAlbum,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    Album: null,
                };
            }
        },
        deleteAlbum: async (_: any, { id }: { id: string }, { dataSources, token }: any) => {
            try {
                const deleteData = await dataSources.AlbumApi.deleteAlbum(id, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Album delete successfully!',
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

export default albumResolver;
