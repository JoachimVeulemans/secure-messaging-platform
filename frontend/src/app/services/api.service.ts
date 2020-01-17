import * as shajs from 'sha.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserLogin } from '../data/interfaces/IUserLogin';
import { Injectable } from '@angular/core';
import { Message } from '../data/classes/Message';
import { Observable } from 'rxjs';
import { User } from '../data/classes/User';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private _apiURL = environment.apiUrl;
    private optionsWithCredentials = { withCredentials: true };
    private optionsWithJSON = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

    constructor(private http: HttpClient) { }

    /**
     * LOGIN + LOGOUT
     */

    login(user: IUserLogin): Observable<Boolean> {
        const url = `${this._apiURL}/login`;

        user._password = shajs('sha256').update(user._password + user._salt).digest('hex');
        const body = {
            username: user._username,
            password: user._password
        };

        return this.http.post<Boolean>(url, body, this.optionsWithCredentials);
    }

    loggedin(): Observable<Boolean> {
        const url = `${this._apiURL}/loggedin`;

        return this.http.get<Boolean>(url, this.optionsWithCredentials);
    }

    logout(): Observable<Boolean> {
        const url = `${this._apiURL}/logout`;

        return this.http.post<Boolean>(url, {}, this.optionsWithCredentials);
    }

    checkUsername(username: string): Observable<Boolean> {
        const url = `${this._apiURL}/checkusername/${username}`;

        return this.http.get<Boolean>(url, this.optionsWithCredentials);
    }

    /**
     * USER
     */

    getAllUsers(): Observable<User[]> {
        const url = `${this._apiURL}/users`;

        return this.http.get<User[]>(url, this.optionsWithCredentials);
    }

    getUser(user: User): Observable<User> {
        const url = `${this._apiURL}/users/${user.id}`;

        return this.http.get<User>(url, this.optionsWithCredentials);
    }

    getUserMe(): Observable<User> {
        const url = `${this._apiURL}/users/me`;

        return this.http.get<User>(url, this.optionsWithCredentials);
    }

    getUserSalt(): Observable<string> {
        const url = `${this._apiURL}/salt`;

        return this.http.get<string>(url, this.optionsWithCredentials);
    }

    getUserSaltByUsername(username: string): Observable<string> {
        const url = `${this._apiURL}/salt/${username}`;

        return this.http.get<string>(url, this.optionsWithCredentials);
    }

    createUser(user: User): Observable<User> {
        user.password = shajs('sha256').update(user.password + user.salt).digest('hex');
        const url = `${this._apiURL}/users`;
        const body = new User().toDocument(user);

        return this.http.post<User>(url, body, this.optionsWithCredentials);
    }

    putUserMe(user: User) {
        user.password = shajs('sha256').update(user.password + user.salt).digest('hex');
        const body = new User().toDocument(user);
        const url = `${this._apiURL}/users/me`;

        return this.http.put(url, body, this.optionsWithCredentials);
    }

    putUser(user: User) {
        user.password = shajs('sha256').update(user.password + user.salt).digest('hex');
        const userId = user.id;
        const body = new User().toDocument(user);
        const url = `${this._apiURL}/users/${userId}`;

        return this.http.put(url, body, this.optionsWithCredentials);
    }

    deleteUserMe() {
        const url = `${this._apiURL}/users/me`;

        return this.http.delete(url, this.optionsWithCredentials);
    }

    deleteUser(user: User) {
        const url = `${this._apiURL}/users/${user.id}`;

        return this.http.delete(url, this.optionsWithCredentials);
    }

    /**
     * MESSAGE
     */

    getAllMessages(): Observable<Message[]> {
        const url = `${this._apiURL}/messages`;

        return this.http.get<Message[]>(url, this.optionsWithCredentials);
    }

    getMessage(message: Message): Observable<Message> {
        const url = `${this._apiURL}/users/${message.id}`;

        return this.http.get<Message>(url, this.optionsWithCredentials);
    }

    getMessagesMe(): Observable<Message[]> {
        const url = `${this._apiURL}/messages/me`;

        return this.http.get<Message[]>(url, this.optionsWithCredentials);
    }

    getMessagesSentMe(): Observable<Message[]> {
        const url = `${this._apiURL}/messages/sent/me`;

        return this.http.get<Message[]>(url, this.optionsWithCredentials);
    }

    createMessage(message: Message): Observable<Message> {
        const url = `${this._apiURL}/messages`;
        const body = message.toDocument(message);

        return this.http.post<Message>(url, body, this.optionsWithCredentials);
    }

    deleteMessage(message: Message) {
        const url = `${this._apiURL}/messages/${message.id}`;

        return this.http.delete(url, this.optionsWithCredentials);
    }

}
