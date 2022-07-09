import { RESTDataSource } from 'apollo-datasource-rest';
import { IRegisterUser, IUserDataSources } from '../models/user.model';
export class Users extends RESTDataSource implements IUserDataSources {
    constructor() {
        super();
        // the Catstronauts catalog is hosted on this server
        this.baseURL = 'http://localhost:3004/v1/users/';
    }
    registerUser(registerUserData: IRegisterUser) {
        return this.post('register', { ...registerUserData });
    }
    loginUser() {
        return this.post('login');
    }
    verifyUser() {
        return this.post('verify');
    }
    getUserById(userId: string) {
        return this.post(userId);
    }
}
