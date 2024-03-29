﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (state.url === "/") {
                this.router.navigate([environment.dashboard]);
                return false;
            } else {
                // logged in so return true
                return true;
            }
        }
      //  not logged in so redirect to login page with the return url
       this.router.navigate([environment.loginpage], { queryParams: { returnUrl: state.url === "/" ? environment.dashboard : state.url } });
       return false;

       // return false;
    }
}