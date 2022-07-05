import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import { TrackAPI } from './datasources/track-api';

export const resolvers = {
    Query: {
        // returns an array of Tracks that will be used to populate the homepage grid of our web client
        tracksForHome: (_, __, { dataSources }) => {
            return dataSources.trackAPI.getTracksForHome();
        },

        // // get a single track by ID, for the track page
        // track: (_: any, { id }: { id: string }, { dataSources }) => {
        //     return dataSources.trackAPI.getTrack(id);
        // },
    },
    // Track: {
    //     author: ({ authorId }, _, { dataSources }) => {
    //         return dataSources.trackAPI.getAuthor(authorId);
    //     },
    //
    //     modules: ({ id }, _, { dataSources }) => {
    //         return dataSources.trackAPI.getTrackModules(id);
    //     },
    // },
};
