import { IMember } from '../member/member.model';
import { IAllResponse } from '../shared/shared.model';

export interface IBand {
    _id: string;
    name: string;
    origin: string;
    membersId: IMember[];
    website: string;
    genresIds: string[];
}
export interface ICreateBand {
    name: string;
    origin?: string;
    membersId?: IMember[];
    website?: string;
    genresIds?: string[];
}
export interface IAllBand extends IAllResponse {
    items: IBand[];
}
