import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { User } from '../models/user.model';
const baseUrl = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class SearchesService {
  constructor(private http: HttpClient) {}

  search(tipo: 'users' | 'doctors' | 'hospitals', termino: string) {
    const url = `${baseUrl}/search/coleccion/${tipo}/${termino}`;
    return this.http.get(url, this.headers).pipe(
      map((res: any) => {
        switch (tipo) {
          case 'users':
            return this.transformUsers(res.data);
          default:
            return [];
        }
      })
    );
  }

  transformUsers(list: any[]): User[] {
    return list.map(
      (user: any) =>
        new User(
          user.name,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.id
        )
    );
  }

  get token() {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
}