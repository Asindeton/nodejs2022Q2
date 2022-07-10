import { ICreateTrack } from './track.model';

const trackResolver = {
    Query: {
        getAllTrack: (_: any, { limit, offset }: { limit: number; offset: number }, { dataSources }: any) => {
            return dataSources.TrackApi.getAllTrack(limit, offset);
        },
        getTrackById: (_: any, { id }: { id: string }, { dataSources }: any) => {
            return dataSources.TrackApi.getTrackById(id);
        },
    },
    Mutation: {
        createTrack: async (_: any, { trackData }: { trackData: ICreateTrack }, { dataSources, token }: any) => {
            try {
                const newTrack = await dataSources.TrackApi.createTrack({ ...trackData }, token);
                return {
                    code: 203,
                    success: true,
                    message: 'Track created successfully!',
                    Track: newTrack,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    Track: null,
                };
            }
        },
        updateTrack: async (
            _: any,
            { trackData, id }: { trackData: ICreateTrack; id: string },
            { dataSources, token }: any
        ) => {
            try {
                const updatedTrack = await dataSources.TrackApi.updateTrack(id, { ...trackData }, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Track update successfully!',
                    Track: updatedTrack,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    Track: null,
                };
            }
        },
        deleteTrack: async (_: any, { id }: { id: string }, { dataSources, token }: any) => {
            try {
                const deleteData = await dataSources.TrackApi.deleteTrack(id, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Track delete successfully!',
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

export default trackResolver;
