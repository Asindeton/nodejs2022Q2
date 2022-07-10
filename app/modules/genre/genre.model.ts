import { IAllResponse } from '../shared/shared.model';

export interface IGenre {
    _id: string;
    name: string;
    description: string;
    country: string;
    year: string;
}

export interface ICreateGenre {
    name: string;
    description?: string;
    country?: string;
    year?: string;
}
export interface IAllGenre extends IAllResponse {
    items: IGenre[];
}
