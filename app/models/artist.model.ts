export interface IArtist extends IArtistRequiredInfo, IArtistAdditionalInfo {
    _id: string;
}
export interface ICreateArtist extends IArtistRequiredInfo, IArtistAdditionalInfo {}
export interface IArtistRequiredInfo {
    firstName: string;
    secondName: string;
    country: string;
}
export interface IArtistAdditionalInfo {
    middleName?: string;
    birthDate?: string;
    birthPlace?: string;
    bandsIds?: string[];
    instruments?: string[];
}
export interface IAllArtistsResponse {
    limit: number;
    offset: number;
    total: number;
    items: IArtist[];
}
