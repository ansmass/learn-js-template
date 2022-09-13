const tbody = document.getElementById('table_body');
const modal = document.getElementById('container_update-modale');
const close = document.getElementById('close-cross');
// ––– FUNCTIONS ––––––––––––––––––––––––––––––––––––––––––––––––––––––

/**
 * @description Init data of table
 */
async function init() {
    refreshData();
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
        updateButton.addEventListener('click', () => {
            modal.style.display = 'flex';
        })
        close.addEventListener('click', () =>{
            modal.style.display = 'none';
        })

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


// ––– ALGO ––––––––––––––––––––––––––––––––––––––––––––––––––––––

init();