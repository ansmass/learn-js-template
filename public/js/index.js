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
function showValue(value){
    let tbody = document.getElementById('table_body');

    value.forEach(user => {
        let tr = document.createElement('tr');
        
        let avatar = document.createElement('td');
        let avatarImg = document.createElement('img');
        avatarImg.src = user.avatar;
        avatar.appendChild(avatarImg);
        tr.appendChild(avatar);
        
        let lastName = document.createElement('td');
        lastName.innerHTML = user.last_name;
        tr.appendChild(lastName);
        
        let firstName = document.createElement('td');
        firstName.innerHTML = user.first_name;
        tr.appendChild(firstName);
        
        let email = document.createElement('td');
        email.innerHTML = user.email;
        tr.appendChild(email);
        
        tbody.appendChild(tr);
    });
}

function init() {
    getRandomUsers().then((value) => {showValue(value);}, (error) => console.error(error));   
}
init();