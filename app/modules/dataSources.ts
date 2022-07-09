import { UserDataSources } from './user/userDataSources';
import { ArtistDataSources } from './artist/artistDataSources';

const dataSources = () => {
    return {
        UserApi: new UserDataSources(),
        ArtistsApi: new ArtistDataSources(),
    };
};

export default dataSources;
