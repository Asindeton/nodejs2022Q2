import { ICreateArtist } from './artist.model';

const artistResolvers = {
    Query: {
        getAllArtists: (_: any, { limit, offset }: { limit: number; offset: number }, { dataSources }: any) => {
            return dataSources.ArtistsApi.getAllArtists(limit, offset);
        },
        getArtistById: (_: any, { id }: { id: string }, { dataSources }: any) => {
            return dataSources.ArtistsApi.getArtistById(id);
        },
    },
    Mutation: {
        createArtist: async (_: any, { artistData }: { artistData: ICreateArtist }, { dataSources, token }: any) => {
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
        updateArtist: async (
            _: any,
            { artistData, id }: { artistData: ICreateArtist; id: string },
            { dataSources, token }: any
        ) => {
            try {
                const newArtist = await dataSources.ArtistsApi.updateArtist(id, { ...artistData }, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Artist update successfully!',
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
        deleteArtist: async (_: any, { id }: { id: string }, { dataSources, token }: any) => {
            try {
                const deleteData = await dataSources.ArtistsApi.deleteArtist(id, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Artist delete successfully!',
                    deleteData,
                };
            } catch (err: any) {
                console.log(err);
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

export default artistResolvers;
