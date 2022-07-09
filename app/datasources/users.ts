import { RESTDataSource } from 'apollo-datasource-rest';
import { ILoinUser, IRegisterUser, IUser } from '../models/user.model';
import { REQUEST_URL } from '../config/develop.config';
export class Users extends RESTDataSource {
    constructor() {
        super();
        // the Catstronauts catalog is hosted on this server
        this.baseURL = REQUEST_URL.USERS;
    }
    registerUser(registerUserData: IRegisterUser): Promise<IUser> {
        return this.post('register', { ...registerUserData });
    }
    loginUser(loginUser: ILoinUser) {
        return this.post('login', { ...loginUser });
    }
    verifyUser(token: string) {
        return this.post('verify', {}, { headers: { Authorization: `Bearer ${token}` } });
    }
    getUserById(userId: string) {
        return this.get(userId);
    }
}
