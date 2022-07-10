import { RESTDataSource } from 'apollo-datasource-rest';
import { REQUEST_URL } from '../../config/develop.config';
import { IAllBand, IBand, ICreateBand } from './band.model';
import { getHeader } from '../../utils/getMutationHeader';
export class BandDataSources extends RESTDataSource {
    constructor() {
        super();
        // the Catstronauts catalog is hosted on this server
        this.baseURL = REQUEST_URL.BANDS;
    }
    getAllBands(limit = 5, offset = 0): Promise<IAllBand> {
        return this.get('', {
            limit,
            offset,
        });
    }
    getBandsById(id: string): Promise<IBand> {
        return this.get(id);
    }
    createBand(data: ICreateBand, token: string) {
        console.log({ data });
        return this.post('', { ...data }, getHeader(token));
    }
    updateBand(id: string, data: ICreateBand, token: string) {
        return this.put(`${id}`, { ...data }, getHeader(token));
    }
    deleteBand(id: string, token: string) {
        return this.delete(id, {}, getHeader(token));
    }
}
