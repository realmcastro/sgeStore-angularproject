import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cookieService: CookieService) {}

  get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookieService.get(this.TOKEN_KEY);
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set(this.TOKEN_KEY, token, { expires: 1 });
    }
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.delete(this.TOKEN_KEY);
    }
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 
      return decodedToken.exp > currentTime; 
    } catch (error) {
      this.removeToken();
      return false;
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  createAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.token;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}