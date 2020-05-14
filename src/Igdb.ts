import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Apicalypse } from './ApicalypseWrapper';

export class Igdb {
    private apiKey: string; 
    private apiUrl: string;
    private igdb: AxiosInstance;

    constructor() {
        this.apiUrl = process.env.IGDB_API_URL
        this.apiKey = process.env.IGDB_API_KEY

        this.igdb = axios.create({
            baseURL: this.apiUrl,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': this.apiKey
            }
        });
    }

    public search(searchType: string, page: number): Promise<Array<Object>> {
        let query = new Apicalypse();
        let gamesPerPage = 10;
        let currentPage = (page - 1) * gamesPerPage;

        if (searchType === IgdbSearchType.COMMING_SOON) {
            const timestamp = Math.floor(Date.now() / 1000);
            query = query.where(`first_release_date > ${timestamp}`).fields('name, first_release_date').sort('popularity', 'desc').limit(10).offset(currentPage);
        }

        return this.rawRequest(query);
    }

    private async rawRequest(query): Promise<Array<Object>> {
        return await this.igdb(`/games`, query).then((response) => {
            return response.data;
        }).catch((error) => {
            console.error(error);
        });
    }
}

export enum IgdbSearchType {
    COMMING_SOON = 'comming-soon'
}
