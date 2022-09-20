import { User } from "./user.js";


export class Table extends User {
    // Global variables
    userIdToUpdate = null;
    tbody = document.getElementById('table_body');
    inputUserAvatar = document.getElementById('url');
    inputUserEmail = document.getElementById('email');
    inputUserLastName = document.getElementById('lastName');
    inputUserFirstName = document.getElementById('firstName');
    modal = document.getElementById('container_update-modale');
    submitAddButton = document.getElementById('submitAddButton');
    submitUpdateButton = document.getElementById('submitUpdateButton');

    constructor() {
        super();
        this.initTable();
    }

    /**
     * @description Init data of table
     */
    async initTable() {
        await this.refereshData();
        this.addEventOnButtons();
    }

    /**
     * @description Delete and recharge data of table
     */
    async refereshData() {
        await this.getRandomUsers();
        this.fillTable();
    }

    /**
     * @description Fill table with random user
     */
    fillTable() {
        this.users.forEach(user => {
            this.createRowTable(user);
        });
    }

    /**
     * @description All interaction with the buttons
     */
    addEventOnButtons() {
        const closeBtnModal = document.getElementById('close-cross');
        const refreshButton = document.getElementById('container_refresh-button');
        const addNewUserButton = document.getElementById('container_add-user-button');

        refreshButton.addEventListener('click', () => {
            this.removeAllData();
            this.refereshData();
        });

        closeBtnModal.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        submitUpdateButton.addEventListener('click', () => {
            const trToUpdate = document.getElementById(this.userIdToUpdate);

            trToUpdate.children[3].innerText = this.inputUserEmail.value;
            trToUpdate.children[1].innerText = this.inputUserLastName.value;
            trToUpdate.children[2].innerText = this.inputUserFirstName.value;
            trToUpdate.children[0].firstChild.src = this.inputUserAvatar.value;

            this.modal.style.display = 'none';
        });

        addNewUserButton.addEventListener('click', () => {
            this.modal.style.display = 'flex';
            this.submitAddButton.style.display = 'block';
            this.submitUpdateButton.style.display = 'none';
        });

        submitAddButton.addEventListener('click', () => {
            this.modal.style.display = 'none';
            this.createRowTable();
        })
    }

    /**
     * @description delete all data of th table
     */
    removeAllData() {
        while (this.tbody.firstChild) {
            this.tbody.removeChild(this.tbody.firstChild);
        }
    }

    /**
     * @description fill the inputs of modal with data
     */
    fillModalForm(tr) {
        this.inputUserEmail.value = tr.children[3].innerText;
        this.inputUserLastName.value = tr.children[1].innerText;
        this.inputUserFirstName.value = tr.children[2].innerText;
        this.inputUserAvatar.value = tr.children[0].firstChild.src;
    }

    createRowTable(user) {
        const tr = document.createElement('tr');

        const userAvatar = document.createElement('img');

        const userAvatarTd = document.createElement('td');
        const userLastNameTd = document.createElement('td')
        const userFirstNameTd = document.createElement('td');
        const userEmailTd = document.createElement('td');

        const actionsTd = document.createElement('td');
        const deleteButton = document.createElement('button');
        const updateButton = document.createElement('button');

        if (user === null || user === undefined) {
            tr.id = Math.random().toString(16).slice(2);
            // Set avatar
            userAvatar.src = this.inputUserAvatar.value;
            userAvatarTd.appendChild(userAvatar);
            tr.appendChild(userAvatarTd);

            userLastNameTd.innerText = this.inputUserLastName.value;
            tr.appendChild(userLastNameTd);

            userFirstNameTd.innerText = this.inputUserFirstName.value;
            tr.appendChild(userFirstNameTd);

            userEmailTd.innerText = this.inputUserEmail.value;
            tr.appendChild(userEmailTd);
        } else {
            tr.id = user.uid;

            // Table data to avatar
            userAvatar.src = user.avatar;
            userAvatarTd.appendChild(userAvatar);
            tr.appendChild(userAvatarTd);

            // Table data to last name

            userLastNameTd.innerText = user.last_name;
            tr.appendChild(userLastNameTd)

            // Table data to first name
            userFirstNameTd.innerText = user.first_name;
            tr.appendChild(userFirstNameTd);

            // Table data to email
            userEmailTd.innerText = user.email;
            tr.appendChild(userEmailTd);
        }

        // Table data to actions button
        tr.appendChild(actionsTd);

        // Button to delete row one by one of the table
        actionsTd.appendChild(deleteButton);
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            tr.remove(tr.children);
        });

        // Button to update data of user
        actionsTd.appendChild(updateButton);
        updateButton.innerText = 'Update';
        updateButton.addEventListener('click', () => {
            this.modal.style.display = 'flex';
            this.submitAddButton.style.display = 'none';
            this.submitUpdateButton.style.display = 'block';

            if (user !== null || user !== undefined) {
                this.fillModalForm(tr);
                this.userIdToUpdate = tr.id;
            }
        });

        this.tbody.appendChild(tr);
    }
}