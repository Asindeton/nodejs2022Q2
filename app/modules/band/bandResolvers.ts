import { ICreateBand } from './band.model';

const bandResolver = {
    Query: {
        getAllBands: (_: any, { limit, offset }: { limit: number; offset: number }, { dataSources }: any) => {
            return dataSources.BandsApi.getAllBands(limit, offset);
        },
        getBandById: (_: any, { id }: { id: string }, { dataSources }: any) => {
            return dataSources.BandsApi.getBandsById(id);
        },
    },
    Mutation: {
        createBand: async (_: any, { bandData }: { bandData: ICreateBand }, { dataSources, token }: any) => {
            try {
                console.log({ bandData });
                const newBand = await dataSources.BandsApi.createBand({ ...bandData }, token);
                return {
                    code: 203,
                    success: true,
                    message: 'Band created successfully!',
                    band: newBand,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    band: null,
                };
            }
        },
        updateBand: async (
            _: any,
            { bandData, id }: { bandData: ICreateBand; id: string },
            { dataSources, token }: any
        ) => {
            try {
                const updatedBand = await dataSources.BandsApi.updateBand(id, { ...bandData }, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Band update successfully!',
                    band: updatedBand,
                };
            } catch (err: any) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    band: null,
                };
            }
        },
        deleteBand: async (_: any, { id }: { id: string }, { dataSources, token }: any) => {
            try {
                const deleteData = await dataSources.BandsApi.deleteBand(id, token);
                return {
                    code: 200,
                    success: true,
                    message: 'Band delete successfully!',
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

export default bandResolver;
