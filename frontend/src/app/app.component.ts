import { Component, OnInit } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';
import { AuthService } from './services/auth.service';
import { FadeAnimation } from './data/animations/fade';
import { PopUpComponent } from './popup/popup.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [FadeAnimation]
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.setApplicationInsights();
        const obs = this.authService.checkLoggedIn();

        obs.subscribe(
            (value) => {
                if (value) {
                    PopUpComponent.addSuccess('Ingelogd!');
                } else {
                    PopUpComponent.addError('We konden jou niet inloggen!');
                }
            }
        );
    }

    setApplicationInsights(): void {
        AppInsights.downloadAndSetup({ instrumentationKey: 'b68fa67d-4176-4f97-a7c7-6a4d84d7170f' });
    }

    getAnimationData(outlet: RouterOutlet) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
