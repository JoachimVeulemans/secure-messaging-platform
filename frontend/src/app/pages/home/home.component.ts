import { ApiService } from './../../services/api.service';
import { AppInsights } from 'applicationinsights-js';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopUpComponent } from './../../popup/popup.component';
import { Router } from '@angular/router';
import { User } from './../../data/classes/User';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    usernameValue = '';
    usernameAvailable = true;

    constructor(private authService: AuthService, private router: Router, private apiService: ApiService, private http: HttpClient) {
        const sub = this.authService.checkLoggedIn().subscribe((value) => {
            if (value) {
                sub.unsubscribe();
                this.router.navigate(['/']);
            }
        });

        AppInsights.trackPageView('Home');
    }

    login(username: string, password: string): void {
        if (username === '') {
            PopUpComponent.addError('Je gebruikersnaam mag niet leeg zijn.');
            return;
        }
        if (password === '') {
            PopUpComponent.addError('Je wachtwoord mag niet leeg zijn.');
            return;
        }
        this.apiService.getUserSaltByUsername(username).subscribe((salt) => {
            this.apiService.login(new User('', username, '', '', '', password, salt)).subscribe((value) => {
                if (value) {
                    this.apiService.loggedin().subscribe((value2) => {
                        if (value2) {
                            this.authService.checkLoggedIn();
                            location.reload();
                        } else {
                            PopUpComponent.addError('Je wachtwoord is niet correct.');
                        }
                    }, () => {
                        PopUpComponent.addError('We konden niet controleren of je ingelogd was.');
                    });
                } else {
                    PopUpComponent.addError('Je opgegeven wachtwoord is niet correct!');
                }
            }, () => {
                PopUpComponent.addError('We jou niet inloggen.');
            });
        }, () => {
            // SALT NIET OPHAALBAAR -> USER BESTAAT NIET
            PopUpComponent.addError('We konden geen account met deze gebruikersnaam terug vinden.');
        });
    }

    register(username: string): void {
        if (username === '') {
            this.usernameAvailable = false;
            (<HTMLButtonElement>document.getElementById('registerButton')).disabled = true;
            return;
        }
        this.usernameValue = username;
        this.checkUsername(this.usernameValue);
    }

    checkUsername(username: string): void {
        this.apiService.checkUsername(username).subscribe((value) => {
            if (value) {
                // GREEN LIGHT
                this.usernameAvailable = true;
                (<HTMLButtonElement>document.getElementById('registerButton')).disabled = false;

            } else {
                this.usernameAvailable = false;
                (<HTMLButtonElement>document.getElementById('registerButton')).disabled = true;
            }
        }, () => {
            this.usernameAvailable = false;
            (<HTMLButtonElement>document.getElementById('registerButton')).disabled = true;
            PopUpComponent.addError('We konden jouw username niet op duplicaten controleren.');
        });
    }

    registerComplete(firstname: string, lastname: string, username: string, email: string, password: string, passwordNotSend: string) {
        if (username === '') {
            PopUpComponent.addError('Je gebruikersnaam mag niet leeg zijn.');
            return;
        }
        if (firstname === '') {
            PopUpComponent.addError('Je voornaam mag niet leeg zijn.');
            return;
        }
        if (lastname === '') {
            PopUpComponent.addError('Je achternaam mag niet leeg zijn.');
            return;
        }
        if (email === '') {
            PopUpComponent.addError('Je email mag niet leeg zijn.');
            return;
        }
        if (password === '' || passwordNotSend === '') {
            PopUpComponent.addError('Je wachtwoord mag niet leeg zijn.');
            return;
        }
        if (password !== passwordNotSend) {
            PopUpComponent.addError('Je wachtwoorden zijn niet hetzelde.');
            return;
        }

        this.apiService.getUserSalt().subscribe((hash) => {
            const user = new User('', username, firstname, lastname, email, password, hash);

            this.apiService.createUser(user).subscribe(() => {
                PopUpComponent.addSuccess('Je bent succesvol geregistreerd!');
            }, () => {
                PopUpComponent.addError('We konden jou niet registreren.');
            });
        }, () => {
            PopUpComponent.addError('We konden jouw salt niet ophalen.');
        });
    }
}
