import { User } from './types/User.js'

new User();

export class Table{
    fillTable(users){
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