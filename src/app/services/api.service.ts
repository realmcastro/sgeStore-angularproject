import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private auth: AuthService) {}

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${endpoint}`, body);
  }

  get(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${endpoint}`);
  }

  put(endpoint: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${endpoint}`, body);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${endpoint}`);
  }
}
