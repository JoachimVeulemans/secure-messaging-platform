import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { PopUpComponent } from 'src/app/popup/popup.component';
import { Router } from '@angular/router';
import { User } from 'src/app/data/classes/User';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: User = new User();

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        this.apiService.getUserMe().subscribe((value) => {
            this.user = value;
        }, () => {
            PopUpComponent.addError('We konden jouw gebruiker niet ophalen.');
        });
    }

    updateProfile(username: string, firstname: string, lastname: string, email: string): void {
        if (username === '') {
            PopUpComponent.addError('Je gebruikersnaam mag niet leeg zijn.');
            return;
        }
        this.user.username = username;
        if (firstname === '') {
            PopUpComponent.addError('Je voornaam mag niet leeg zijn.');
            return;
        }
        this.user.firstname = firstname;
        if (lastname === '') {
            PopUpComponent.addError('Je achternaam mag niet leeg zijn.');
            return;
        }
        this.user.lastname = lastname;
        if (email === '') {
            PopUpComponent.addError('Je email mag niet leeg zijn.');
            return;
        }
        this.user.email = email;

        this.apiService.putUserMe(this.user).subscribe(() => {
            PopUpComponent.addSuccess('We hebben jouw profiel bijgewerkt.');
        }, () => {
            PopUpComponent.addError('We konden jouw profiel niet bijwerken.');
        });
    }

    deleteProfile(): void {
        this.apiService.deleteUserMe().subscribe(() => {
            // TODO: also deletes the messages of the user
            PopUpComponent.addSuccess('We hebben jouw profiel verwijderd.');
            this.apiService.logout();
        }, () => {
            PopUpComponent.addError('We konden jouw profiel niet verwijderen.');
        });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }

    logout(): void {
        this.apiService.logout().subscribe(() => {
            PopUpComponent.addSuccess('We hebben je uitgelogd!');
            location.reload();
        }, () => {
            PopUpComponent.addError('We konden jou niet uitloggen.');
        });
    }
}
