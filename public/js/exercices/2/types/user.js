export class User {
    users;

    constructor() {
        this.getRandomUsers().then(
            (users) => {
                this.users = users
            },
            (err) => console.error(err)
        );
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