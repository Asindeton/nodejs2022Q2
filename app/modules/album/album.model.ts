import { IAllResponse } from '../shared/shared.model';

export interface IAlbum extends ICreateAlbum {
    _id: string;
}
export interface ICreateAlbum {
    name: string;
    released?: number;
    artistsIds?: string[];
    bandsIds?: string[];
    trackIds?: string[];
    genresIds?: string[];
    image?: string;
}
export interface IAllAlbum extends IAllResponse {
    items: IAlbum[];
}
