import { IDocument } from '../interfaces/document';
import { IUserLogin } from '../interfaces/IUserLogin';
import { IUserNames } from '../interfaces/IUserNames';

export class User implements IDocument<User>, IUserNames, IUserLogin {
    _id: string;
    _username: string;
    _firstname: string;
    _lastname: string;
    _email: string;
    _password: string;
    _salt: string;

    /** Needed for proper functioning of treeview */
    public icon: string;
    public iconOpen: string;
    public type: string;
    public name: string;
    public class: string;

    /** constructor */
    constructor(id: string = '', username: string = '', firstname: string = '', lastname: string = '', email: string = '', password: string = '', salt: string = '') {
        this._id = id;
        this._username = username;
        this._firstname = firstname;
        this._lastname = lastname;
        this._email = email;
        this._password = password;
        this._salt = salt;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get firstname(): string {
        return this._firstname;
    }

    set firstname(value: string) {
        this._firstname = value;
    }

    get lastname(): string {
        return this._lastname;
    }

    set lastname(value: string) {
        this._lastname = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get fullname(): string {
        return this._firstname + ' ' + this._lastname;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get salt(): string {
        return this._salt;
    }

    set salt(value: string) {
        this._salt = value;
    }

    /** Override of toString */
    public toString() {
        return this._firstname + ' ' + this._lastname;
    }

    fromDocument(userJson: any): User {
        const user = new User();

        if (!userJson.hasOwnProperty('id')) {
            return user;
        }

        user.id = userJson['id'];
        user.username = userJson['username'];
        user.firstname = userJson['firstname'];
        user.lastname = userJson['lastname'];
        user.email = userJson['email'];
        user.password = userJson['password'];
        user.salt = userJson['salt'];

        return user;
    }

    toDocument(obj: User): any {
        const userJson = <any>{};

        if (obj.id !== '') {
            userJson.id = obj.id;
        }

        userJson.username = obj.username;
        userJson.firstname = obj.firstname;
        userJson.lastname = obj.lastname;
        userJson.email = obj.email;
        userJson.password = obj.password;
        userJson.salt = obj.salt;

        return userJson;
    }

    hardCopy(obj: User): User {
        const user = new User();

        user.username = obj.username;
        user.firstname = obj.firstname;
        user.lastname = obj.lastname;
        user.email = obj.email;
        user.salt = obj.salt;

        return user;
    }
}
