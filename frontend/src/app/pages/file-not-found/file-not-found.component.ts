import { AppInsights } from 'applicationinsights-js';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-file-not-found',
    templateUrl: './file-not-found.component.html',
    styleUrls: ['./file-not-found.component.scss']
})
export class FileNotFoundComponent {
    constructor(private router: Router) {
        AppInsights.trackPageView('404');
        AppInsights.trackEvent('404');
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
