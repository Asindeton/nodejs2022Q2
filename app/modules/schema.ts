import { userSchema } from './user/user.schema';
import artistSchema from './artist/artist.schema';

const typeDefs = [userSchema, artistSchema];
export default typeDefs;
