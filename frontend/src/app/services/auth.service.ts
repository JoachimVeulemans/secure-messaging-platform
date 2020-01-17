import { Injectable, isDevMode } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
/** Exportation of the class */
export class AuthService {

    /** constructor */
    constructor(private apiService: ApiService) {
        if (!isDevMode()) {
            console.log('%c  Welkom!', 'font-weight: bold; font-size: 50px;color: #007BFF;)');
        }
    }

    /**
     * Method to see if the user is logged in
     */
    checkLoggedIn(): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.apiService.loggedin().subscribe((value) => {
                if (value) {
                    observer.next(true);
                } else {
                    observer.next(false);
                }
            }, () => {
                // Zet hieronder true of te doen alsof je ingelogd bent!
                observer.next(false);
            });
        });
    }
}
