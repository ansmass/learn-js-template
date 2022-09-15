export class User extends Table{
    construct(userId, userAvatar, userLastName, userFirstName, userEmail){
        this.userId = userId;
        this.userAvatar = userAvatar;
        this.userLastName = userLastName;
        this.userFirstName = userFirstName;
        this.userEmail = userEmail;
    }
}