import userResolvers from './user/userResolvers';
import artistResolvers from './artist/artistResolvers';
import bandResolver from './band/bandResolvers';
import genreResolver from './genre/genreResolvers';
import trackResolver from './track/trackResolvers';
import albumResolver from './album/albumResolvers';
import favoriteResolver from './favourites/favouritesResolvers';

const resolvers = [
    userResolvers,
    artistResolvers,
    bandResolver,
    genreResolver,
    trackResolver,
    albumResolver,
    favoriteResolver,
];

export default resolvers;
