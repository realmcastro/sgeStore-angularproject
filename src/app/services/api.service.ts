import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  post(endpoint: string, body: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post<any>(`${this.API_URL}/${endpoint}`, body, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('jwt_token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
