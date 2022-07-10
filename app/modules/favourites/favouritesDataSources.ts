import { RESTDataSource } from 'apollo-datasource-rest';
import { REQUEST_URL } from '../../config/develop.config';
import { getHeader } from '../../utils/getMutationHeader';
import { IFavorite, IFavoriteMutation } from './favourites.model';
export class FavouritesDataSources extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = REQUEST_URL.FAVORITES;
    }
    getAllFavorite(token: string): Promise<IFavorite> {
        return this.get('', {}, getHeader(token));
    }
    createFavorite(data: IFavoriteMutation, token: string) {
        console.log({ data });
        return this.put('add', { ...data }, getHeader(token));
    }
    deleteFavorite(data: IFavoriteMutation, token: string) {
        return this.put('remove', { ...data }, getHeader(token));
    }
}
