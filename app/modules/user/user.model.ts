export interface IUser extends IRegisterUser {
    _id: string;
}

export interface IRegisterUser {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}
export interface ILoinUser {
    email: string;
    password: string;
}
export interface IVerifyData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    iat: number;
}
