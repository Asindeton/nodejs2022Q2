import { RESTDataSource } from 'apollo-datasource-rest';
import { REQUEST_URL } from '../config/develop.config';
import { IAllArtistsResponse, IArtist, ICreateArtist } from '../models/artist.model';
import { getHeader } from '../utils/getMutationHeader';
export class Artists extends RESTDataSource {
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
}
