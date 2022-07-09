export interface IUser extends IRegisterUser {
    _id: string;
}

export interface IRegisterUser {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export interface IUserDataSources {
    registerUser(registerUserData: IRegisterUser): Promise<IUser>;
}
