import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginResolver implements Resolve<boolean> {

  constructor(private authService: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.token;

    if (token) {
      if (this.authService.isTokenValid(token)) {
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard se o token for válido
        return false;
      } else {
        this.authService.removeToken();
      }
    }

    return true; 
  }
}