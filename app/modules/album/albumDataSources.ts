import { RESTDataSource } from 'apollo-datasource-rest';
import { REQUEST_URL } from '../../config/develop.config';
import { getHeader } from '../../utils/getMutationHeader';
import { IAllAlbum, IAlbum, ICreateAlbum } from './album.model';
export class AlbumDataSources extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = REQUEST_URL.ALBUM;
    }
    getAllAlbum(limit = 5, offset = 0): Promise<IAllAlbum> {
        return this.get('', {
            limit,
            offset,
        });
    }
    getAlbumById(id: string): Promise<IAlbum> {
        return this.get(id);
    }
    createAlbum(data: ICreateAlbum, token: string) {
        return this.post('', { ...data }, getHeader(token));
    }
    updateAlbum(id: string, data: ICreateAlbum, token: string) {
        return this.put(`${id}`, { ...data }, getHeader(token));
    }
    deleteAlbum(id: string, token: string) {
        return this.delete(id, {}, getHeader(token));
    }
}
