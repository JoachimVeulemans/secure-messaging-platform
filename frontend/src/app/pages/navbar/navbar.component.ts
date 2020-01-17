import { ApiService } from './../../services/api.service';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IUserNames } from 'src/app/data/interfaces/IUserNames';
import { PopUpComponent } from 'src/app/popup/popup.component';
import { Router } from '@angular/router';
import { User } from 'src/app/data/classes/User';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    visible = false;
    user: IUserNames = new User();

    constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
        this.apiService.loggedin().subscribe((value) => {
            if (value) {
                this.apiService.getUserMe().subscribe((value2: IUserNames) => {
                    this.user = value2;
                }, () => {
                    PopUpComponent.addError('We konden jouw gebruiker niet ophalen.');
                });
            }
        }, () => {
            PopUpComponent.addError('We konden niet controleren of je ingelogd was.');
        });

        this.authService.checkLoggedIn().subscribe((value) => {
            this.visible = value;
        }, () => {
            this.visible = false;
        });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
