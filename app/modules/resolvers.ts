import userResolvers from './user/userResolvers';
import artistResolvers from './artist/artistResolvers';
import bandResolver from './band/bandResolvers';
import genreResolver from './genre/genreResolvers';

const resolvers = [userResolvers, artistResolvers, bandResolver, genreResolver];

export default resolvers;
