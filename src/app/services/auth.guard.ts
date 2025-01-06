import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.authService.token;
      if (token) {
        if (this.authService.isTokenValid(token)) {
          return true;
        } else {
          this.authService.removeToken();
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
    return true;
  }
}