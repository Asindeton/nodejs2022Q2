import { RESTDataSource } from 'apollo-datasource-rest';
export class TrackAPI extends RESTDataSource {
    constructor() {
        super();
        // the Catstronauts catalog is hosted on this server
        this.baseURL = 'http://localhost:3006/v1/';
    }

    getTracksForHome() {
        return this.get('tracks');
    }
}
