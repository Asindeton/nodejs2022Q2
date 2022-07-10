export interface IFavorite {
    _id: string;
    userId: string;
    bandsIds: string[];
    genresIds: string[];
    artistsIds: string[];
    tracksIds: string[];
}

export interface IFavoriteMutation {
    id: string;
    type: FavoriteType;
}

const enum FavoriteType {
    bands = 'bands',
    genres = 'genres',
    artists = 'artists',
    tracks = 'tracks',
}
