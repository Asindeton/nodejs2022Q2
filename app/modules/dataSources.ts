import { UserDataSources } from './user/userDataSources';
import { ArtistDataSources } from './artist/artistDataSources';
import { BandDataSources } from './band/bandDataSources';

const dataSources = () => {
    return {
        UserApi: new UserDataSources(),
        ArtistsApi: new ArtistDataSources(),
        BandsApi: new BandDataSources(),
    };
};

export default dataSources;
