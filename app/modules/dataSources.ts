import { UserDataSources } from './user/userDataSources';
import { ArtistDataSources } from './artist/artistDataSources';
import { BandDataSources } from './band/bandDataSources';
import { GenreDataSources } from './genre/genreDataSources';

const dataSources = () => {
    return {
        UserApi: new UserDataSources(),
        ArtistsApi: new ArtistDataSources(),
        BandsApi: new BandDataSources(),
        GenreApi: new GenreDataSources(),
    };
};

export default dataSources;
