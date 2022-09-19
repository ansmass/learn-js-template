import { User } from "./user.js";

export class Table extends User {
    userIdToUpdate = null;
    tbody = document.getElementById('table_body');
    inputUserAvatar = document.getElementById('url');
    inputUserEmail = document.getElementById('email');
    inputUserLastName = document.getElementById('lastName');
    inputUserFirstName = document.getElementById('firstName');
    modal = document.getElementById('container_update-modale');

    constructor() {
        super();
        this.initTable();
    }

    async initTable() {
        // Fill table => Remplir le tableau avec les données (C'EST TOUT)
        await this.refereshData();

        // Add event listerner on buttons => Ajout des événements sur tous les boutons
        this.addEventOnButtons();
    }

    async refereshData(){
        await this.getRandomUsers();
        this.fillTable();
    }

    fillTable() {
        this.users.forEach(user => {
            let tr = document.createElement('tr');
            tr.id = user.uid;

            // Table data to avatar
            let userAvatarTd = document.createElement('td');
            let userAvatar = document.createElement('img');
            userAvatar.src = user.avatar;
            userAvatarTd.appendChild(userAvatar);
            tr.appendChild(userAvatarTd);

            // Table data to last name
            let userLastName = document.createElement('td')
            userLastName.innerText = user.last_name;
            tr.appendChild(userLastName)

            // Table data to first name
            let userFirstName = document.createElement('td');
            userFirstName.innerText = user.first_name;
            tr.appendChild(userFirstName);

            // Table data to email
            let userEmail = document.createElement('td');
            userEmail.innerText = user.email;
            tr.appendChild(userEmail);

            // Table data to actions button
            let button = document.createElement('td');
            tr.appendChild(button);

            // Button to delete row one by one of the table
            let deleteButton = document.createElement('button');
            button.appendChild(deleteButton);
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                tr.remove(tr.children);
            });

            // Button to update data of user
            let updateButton = document.createElement('button');
            button.appendChild(updateButton);
            updateButton.innerText = 'Update';
            updateButton.addEventListener('click', () => {
                this.modal.style.display = 'flex';
                this.fillModalForm(tr);
                this.userIdToUpdate = tr.id;
            });

            this.tbody.appendChild(tr);
        });
    }

    addEventOnButtons(){
        const closeBtnModal = document.getElementById('close-cross');
        const submitButton = document.getElementById('submitButton');
        const refreshButton = document.getElementById('container_refresh-button');
        const addNewUserButton = document.getElementById('container_add-user-button');

        refreshButton.addEventListener('click', () => {
            this.removeAllData();
            this.refereshData();
        });

        closeBtnModal.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        submitButton.addEventListener('click', () => {
            const trToUpdate = document.getElementById(this.userIdToUpdate);

            trToUpdate.children[3].innerText = this.inputUserEmail.value; 
            trToUpdate.children[1].innerText = this.inputUserLastName.value; 
            trToUpdate.children[2].innerText = this.inputUserFirstName.value; 
            trToUpdate.children[0].firstChild.src = this.inputUserAvatar.value;

            this.modal.style.display = 'none';
        });

        addNewUserButton.addEventListener('click', () => {
            this.modal.style.display = 'flex';

            console.log('New user modale');
        })
    }

    removeAllData() {
        while (this.tbody.firstChild) {
            this.tbody.removeChild(this.tbody.firstChild);
        }
    }

    fillModalForm(tr) {
        this.inputUserEmail.value  = tr.children[3].innerText;
        this.inputUserLastName.value  = tr.children[1].innerText;
        this.inputUserFirstName.value  = tr.children[2].innerText;
        this.inputUserAvatar.value  = tr.children[0].firstChild.src;
    }
}