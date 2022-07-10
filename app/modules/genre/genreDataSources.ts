import { RESTDataSource } from 'apollo-datasource-rest';
import { REQUEST_URL } from '../../config/develop.config';
import { getHeader } from '../../utils/getMutationHeader';
import { IAllGenre, ICreateGenre, IGenre } from './genre.model';
export class GenreDataSources extends RESTDataSource {
    constructor() {
        super();
        // the Catstronauts catalog is hosted on this server
        this.baseURL = REQUEST_URL.GENRE;
    }
    getAllGenre(limit = 5, offset = 0): Promise<IAllGenre> {
        return this.get('', {
            limit,
            offset,
        });
    }
    getGenreById(id: string): Promise<IGenre> {
        return this.get(id);
    }
    createGenre(data: ICreateGenre, token: string) {
        return this.post('', { ...data }, getHeader(token));
    }
    updateGenre(id: string, data: ICreateGenre, token: string) {
        return this.put(`${id}`, { ...data }, getHeader(token));
    }
    deleteGenre(id: string, token: string) {
        return this.delete(id, {}, getHeader(token));
    }
}
