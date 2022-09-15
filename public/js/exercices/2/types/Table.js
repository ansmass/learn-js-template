import { User } from "./user.js";

export class Table extends User {
    constructor() {
        super();
        setTimeout(() => this.initTable(), 1000);
    }

    async initTable() {
        console.log(this.users);
        // Fill table => Remplir le tableau avec les données (C'EST TOUT)
        // Add event listerner on buttons => Ajout des événements sur tous les boutons
        // Init modal => INITIALISE LA MODAL
    }

    fillTable(users) {
        users.forEach(user => {
            let tr = document.createElement('tr')

            this.userId.innerText = user.id;
            this.userAvatar.innerText = user.avatar;
            this.userFirstName.innerText = user.first_name;
            this.userLastName.innerText = user.last_name;
            this.userEmail.innerText = user.email;
        });
    }
}