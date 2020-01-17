import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-file-not-found',
    templateUrl: './file-not-found.component.html',
    styleUrls: ['./file-not-found.component.scss']
})
export class FileNotFoundComponent {
    constructor(private router: Router) { }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
