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
 * Your code here ⤵️
 */
const tbody = document.getElementById('table_body');

function showValue(value){
    value.forEach(user => {
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

        let button = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        button.appendChild(deleteButton);
        deleteButton.addEventListener('click', ()=>{
            tr.remove();
        });
        tr.appendChild(button);
        
        tbody.appendChild(tr);
    });
}

function refreshArray(){
    let refreshButton = document.getElementById('container_refresh-button');
    
    refreshButton.addEventListener('click', ()=> {
        tbody.remove(tbody.children);
    });
}

function init() {
    getRandomUsers().then((value) => {showValue(value);}, (error) => console.error(error));   
}

refreshArray();

init();