import { Table } from '../types/Table.js'

new Table();

export class Init{
    constructor() {
        this.getRandomUsers().then((v) => console.log(v));
        console.log('TODO => ICI JE DOIS DÉMARRER TOUT');
    }
    
    async getRandomUsers() {
        try {
            const res = await axios.get("https://random-data-api.com/api/users/random_user?size=100");
            return res.data;
        } catch (err) {
            console.error(`[INDEX JS ERROR] : ${err}`);
        }
    }    
}