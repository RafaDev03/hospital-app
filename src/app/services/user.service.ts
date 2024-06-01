import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user.model';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.development';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginUser(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData);
  }

  validToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        }),
        map((res: any) => res.ok === true),
        catchError(() => of(false))
      );
  }
  logout() {
    localStorage.removeItem('token');
  }
}
