import axios from 'axios';
import { REQUEST_URL } from '../config/develop.config';

export const verifyUser = async (token: string) => {
    return axios.post(REQUEST_URL.USERS + `verify`, {}, { headers: { Authorization: token } });
};
