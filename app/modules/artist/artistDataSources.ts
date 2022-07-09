import { RESTDataSource } from 'apollo-datasource-rest';
import { REQUEST_URL } from '../../config/develop.config';
import { IAllArtistsResponse, IArtist, ICreateArtist } from './artist.model';
import { getHeader } from '../../utils/getMutationHeader';
export class ArtistDataSources extends RESTDataSource {
    constructor() {
        super();
        // the Catstronauts catalog is hosted on this server
        this.baseURL = REQUEST_URL.ARTIST;
    }
    getAllArtists(limit = 5, offset = 0): Promise<IAllArtistsResponse> {
        return this.get('', {
            limit,
            offset,
        });
    }
    getArtistById(id: string): Promise<IArtist> {
        return this.get(id);
    }
    createArtist(data: ICreateArtist, token: string) {
        return this.post('', { ...data }, getHeader(token));
    }
    updateArtist(id: string, data: ICreateArtist, token: string) {
        return this.put(`${id}`, { ...data }, getHeader(token));
    }
    deleteArtist(id: string, token: string) {
        console.log(arguments);
        return this.delete(id, {}, getHeader(token));
    }
}
