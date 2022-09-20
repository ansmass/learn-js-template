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
    async refereshData(){
        await this.getRandomUsers();
        this.fillTable();
    }

    /**
     * @description Fill table with random user
     */
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
            const deleteButton = document.createElement('button');
            button.appendChild(deleteButton);
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
                tr.remove(tr.children);
            });

            // Button to update data of user
            const updateButton = document.createElement('button');
            button.appendChild(updateButton);
            updateButton.innerText = 'Update';
            updateButton.addEventListener('click', () => {
                this.modal.style.display = 'flex';
                this.submitAddButton.style.display = 'none';
                this.submitUpdateButton.style.display = 'block';

                this.fillModalForm(tr);
                this.userIdToUpdate = tr.id;
            });

            this.tbody.appendChild(tr);
        });
    }

    /**
     * @description All interaction with the buttons
     */
    addEventOnButtons(){
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
            this.addNewUser();
        } )
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
        this.inputUserEmail.value  = tr.children[3].innerText;
        this.inputUserLastName.value  = tr.children[1].innerText;
        this.inputUserFirstName.value  = tr.children[2].innerText;
        this.inputUserAvatar.value  = tr.children[0].firstChild.src;
    }

    /**
     * @description Creat new user
     */
    addNewUser(){
        let tr = document.createElement('tr');
        
        // New user avatar
        let newUserAvatarTd = document.createElement('td');
        let newUserAvatar = document.createElement('img');
        newUserAvatar.src = this.inputUserAvatar;
        newUserAvatarTd.appendChild(newUserAvatar);
        tr.appendChild(newUserAvatarTd);

        // New user last name
        let newUserLastName = document.createElement('td');
        newUserLastName.innerText = this.inputUserLastName;
        tr.appendChild(newUserLastName);

        // New user first name
        let newUserFirstName = document.createElement('td');
        newUserFirstName.innerText = this.inputUserFirstName;
        tr.appendChild(newUserFirstName);

        // New user email
        let newUserEmail = document.createElement('td');
        newUserEmail.innerText = this.inputUserEmail;
        tr.appendChild(newUserEmail);
        
        let button = document.createElement('td');
        tr.appendChild(button);

        const deleteButton = document.createElement('button');
        button.appendChild(deleteButton);
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            tr.remove(tr.children);
        });

        const updateButton = document.createElement('button');
        button.appendChild(updateButton);
        updateButton.innerText = 'Update';
        updateButton.addEventListener('click', () => {
            this.modal.style.display = 'flex';
        });

        this.tbody.appendChild(tr);
    }

}