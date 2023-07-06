import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './../services/auth.service';

@Injectable({ 
    providedIn: 'root' 
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.userValue();

    if (user) {
      const { roles } = route.data;

      if (roles && !roles.includes(user.role)) {
        this.router.navigate(['/']);

        return false;
      }

      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
