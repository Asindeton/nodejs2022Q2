import userResolvers from './user/userResolvers';
import artistResolvers from './artist/artistResolvers';
import bandResolver from './band/bandResolvers';

const resolvers = [userResolvers, artistResolvers, bandResolver];

export default resolvers;
