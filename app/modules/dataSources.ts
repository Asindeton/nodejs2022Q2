import { UserDataSources } from './user/userDataSources';
import { ArtistDataSources } from './artist/artistDataSources';
import { BandDataSources } from './band/bandDataSources';
import { GenreDataSources } from './genre/genreDataSources';
import { TrackDataSources } from './track/trackDataSources';
import { AlbumDataSources } from './album/albumDataSources';

const dataSources = () => {
    return {
        UserApi: new UserDataSources(),
        ArtistsApi: new ArtistDataSources(),
        BandsApi: new BandDataSources(),
        GenreApi: new GenreDataSources(),
        TrackApi: new TrackDataSources(),
        AlbumApi: new AlbumDataSources(),
    };
};

export default dataSources;
