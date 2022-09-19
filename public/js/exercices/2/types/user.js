export class User {
    users;

    async getRandomUsers() {
        try {
            const res = await axios.get("https://random-data-api.com/api/users/random_user?size=3");
            this.users = res.data;
        } catch (err) {
            console.error(`[INDEX JS ERROR] : ${err}`);
        }
    }
}