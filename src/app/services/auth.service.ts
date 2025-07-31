import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  role: string; 
}

export interface RegisterUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, password });
  }

  register(user: RegisterUser): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }
}