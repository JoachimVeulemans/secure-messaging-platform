import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { AppInsights } from 'applicationinsights-js';
import { IUserNames } from 'src/app/data/interfaces/IUserNames';
import { PopUpComponent } from './../../popup/popup.component';
import { Router } from '@angular/router';
import { User } from 'src/app/data/classes/User';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: IUserNames = new User();

    constructor(private apiService: ApiService, private router: Router) {
        AppInsights.trackPageView('Dashboard');
    }

    ngOnInit() {
        this.apiService.getUserMe().subscribe((value: IUserNames) => {
            this.user = value;
        }, () => {
            PopUpComponent.addError('We konden jouw gebruiker niet ophalen.');
        });
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
