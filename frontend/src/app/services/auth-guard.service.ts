import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

/** Exportation of the class */
export class AuthGuardService implements CanActivate {

    /** constructor */
    constructor(private authService: AuthService, private router: Router) { }

    /**
     * Method to see where the user should be navigated
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const obs = this.authService.checkLoggedIn();

        obs.subscribe(
            (value) => {
                if (!value) {
                    this.router.navigate(['/home']);
                }
            }
        );

        obs.subscribe(
            (value) => {
                if (value) {
                    console.log('Observer got notification that user is logged in');
                } else {
                    console.log('Observer got notification that user is NOT logged in');
                }
            }
        );

        return obs;
    }
}
