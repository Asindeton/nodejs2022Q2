import userResolvers from './user/userResolvers';
import artistResolvers from './artist/artistResolvers';
import bandResolver from './band/bandResolvers';
import genreResolver from './genre/genreResolvers';
import trackResolver from './track/trackResolvers';

const resolvers = [userResolvers, artistResolvers, bandResolver, genreResolver, trackResolver];

export default resolvers;
