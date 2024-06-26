import { HttpClient } from '@angular/common/http';
import { Injectable, booleanAttribute } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  findHospitals() {
    const url = `${baseUrl}/hospitals`;
    return this.http
      .get<Hospital[]>(url, this.headers)
      .pipe(map((resp: any) => resp.hospitals));
  }

  createHospital(name: string) {
    const url = `${baseUrl}/hospitals`;
    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(name: string, id: string) {
    const url = `${baseUrl}/hospitals/${id}`;
    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(id: string) {
    const url = `${baseUrl}/hospitals/${id}`;
    return this.http.delete(url, this.headers);
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
