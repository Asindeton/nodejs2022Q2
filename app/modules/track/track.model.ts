import { IAllResponse } from '../shared/shared.model';
import { IArtist } from '../artist/artist.model';
import { IBand } from '../band/band.model';
import { IGenre } from '../genre/genre.model';

export interface ITrack extends ICreateTrack {
    _id: string;
}

export interface ICreateTrack {
    title: string;
    albumId?: string;
    artistsIds?: IArtist[];
    bandsIds?: IBand[];
    duration?: number;
    released?: number;
    genresIds?: IGenre[];
}
export interface IAllTrack extends IAllResponse {
    items: ITrack[];
}
