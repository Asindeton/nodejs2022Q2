import { RESTDataSource } from 'apollo-datasource-rest';
import { REQUEST_URL } from '../../config/develop.config';
import { getHeader } from '../../utils/getMutationHeader';
import { IAllTrack, ITrack, ICreateTrack } from './track.model';
export class TrackDataSources extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = REQUEST_URL.TRACKS;
    }
    getAllTrack(limit = 5, offset = 0): Promise<IAllTrack> {
        return this.get('', {
            limit,
            offset,
        });
    }
    getTrackById(id: string): Promise<ITrack> {
        return this.get(id);
    }
    createTrack(data: ICreateTrack, token: string) {
        return this.post('', { ...data }, getHeader(token));
    }
    updateTrack(id: string, data: ICreateTrack, token: string) {
        return this.put(`${id}`, { ...data }, getHeader(token));
    }
    deleteTrack(id: string, token: string) {
        return this.delete(id, {}, getHeader(token));
    }
}
