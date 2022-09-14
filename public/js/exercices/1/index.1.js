let selectedTrToUpdate;
const urlInputModal = document.getElementById('url');
const emailInputModal = document.getElementById('email');
const tbody = document.getElementById('table_body');
const lastNameInputModal = document.getElementById('lastName');
const firstNameInputModal = document.getElementById('firstName');
const modal = document.getElementById('container_update-modale');

// ––– FUNCTIONS ––––––––––––––––––––––––––––––––––––––––––––––––––––––

/**
 * @description Init data of table
 */
async function init() {
    refreshData();
    initModal();
    addEventOnReloadButton();
}

async function refreshData() {
    const users = await getRandomUsers();
    fillTable(users);
}

/**
 *  @description Return list for random users
 */
async function getRandomUsers() {
    try {
        const res = await axios.get("https://random-data-api.com/api/users/random_user?size=100");
        return res.data;
    } catch (err) {
        console.error(`[INDEX JS ERROR] : ${err}`);
    }
}

/**
 * @description Fill table with random user
 * @param {object} users 
 */
function fillTable(users) {
    users.forEach(user => {
        let tr = document.createElement('tr');

        // Table data to avatar
        let avatar = document.createElement('td');
        let avatarImg = document.createElement('img');
        avatarImg.src = user.avatar;
        avatar.appendChild(avatarImg);
        tr.appendChild(avatar);

        // Table data to last name
        let lastName = document.createElement('td');
        lastName.innerHTML = user.last_name;
        tr.appendChild(lastName);

        // Table data to first name
        let firstName = document.createElement('td');
        firstName.innerHTML = user.first_name;
        tr.appendChild(firstName);

        // Table data to email
        let email = document.createElement('td');
        email.innerHTML = user.email;
        tr.appendChild(email);

        // Actions buttons 
        let button = document.createElement('td');
        const deleteButton = document.createElement('button'); //To delete row
        const updateButton = document.createElement('button'); //To update row informations

        deleteButton.innerText = 'Delete';
        updateButton.innerText = 'Update';

        button.appendChild(deleteButton);
        button.appendChild(updateButton);

        deleteButton.addEventListener('click', () => {
            tr.remove();
        });
        updateButton.addEventListener('click', (event) => {
            modal.style.display = 'flex';
            fillFormModal(tr);
        });

        tr.appendChild(button);

        tbody.appendChild(tr);
    });
}

function removeAllData() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

/**
 * @description Reload all data of table
 */
function addEventOnReloadButton() {
    let refreshButton = document.getElementById('container_refresh-button');

    refreshButton.addEventListener('click', async () => {
        removeAllData();
        refreshData();
    });
}

function initModal() {
    const close = document.getElementById('close-cross');
    const submitButton = document.getElementById('submitButton');

    // Add event to close modal
    close.addEventListener('click', () => {
        modal.style.display = "none";
    });

    submitButton.addEventListener('click', () => {
        selectedTrToUpdate.children[3].innerText = emailInputModal.value;
        selectedTrToUpdate.children[0].firstChild.src = urlInputModal.value;
        selectedTrToUpdate.children[1].innerText = lastNameInputModal.value;
        selectedTrToUpdate.children[2].innerText = firstNameInputModal.value;
        modal.style.display = "none";
    });
}

/**
 * @description Update users informations
 */
function fillFormModal(tr) {
    selectedTrToUpdate = tr;
    urlInputModal.value = tr.children[0].firstChild.src;
    lastNameInputModal.value = tr.children[1].innerText;
    firstNameInputModal.value = tr.children[2].innerText;
    emailInputModal.value = tr.children[3].innerText;
}

// ––– ALGO ––––––––––––––––––––––––––––––––––––––––––––––––––––––

init();