import userSchema from './user/user.schema';
import artistSchema from './artist/artist.schema';
import bandSchema from './band/band.schema';
import sharedSchema from './shared/shared.schema';
import memberSchema from './member/member.schema';
import genreSchema from './genre/genre.schema';

const typeDefs = [sharedSchema, userSchema, artistSchema, bandSchema, memberSchema, genreSchema];
export default typeDefs;
