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
    
    for(var i = 0; i < value.length; i++){
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let avatar = document.createElement('img');
        let firstName = document.createElement('p');
        let lastName = document.createElement('p');
        let email = document.createElement('p');
        
        td.appendChild(avatar);
        td.appendChild(firstName);
        td.appendChild(lastName);
        td.appendChild(email);

        tr.appendChild(td);

        tbody.appendChild(tr);
    }
}

function init() {
    getRandomUsers().then((value) => {console.log(value['avatar'] + value['last_name'] + value['first_name'] + value['email']);}, (error) => console.error(error));   
}
init();