import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.development';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UpdateForm } from '../interfaces/update-form.interface';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user?: User;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

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
    const token = this.token;
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((res: any) => {
          const { email, google, id, img, name, role } = res.user;
          this.user = new User(name, email, '', img, google, role, id);
          localStorage.setItem('token', res.token);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  updateUser(formData: UpdateForm) {
    return this.http.put(`${baseUrl}/users/${this.user?.id}`, formData, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
