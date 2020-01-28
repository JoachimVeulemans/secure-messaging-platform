import { Component, OnInit } from '@angular/core';
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
        const obs = this.authService.checkLoggedIn();

        obs.subscribe(
            (value) => {
                if (value) {
                    PopUpComponent.addSuccess('Je bent succesvol ingelogd!');
                }
            }
        );
    }

    getAnimationData(outlet: RouterOutlet) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
