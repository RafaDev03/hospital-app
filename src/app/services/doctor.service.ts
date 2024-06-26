import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { Doctor } from '../models/doctor.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  findDoctors() {
    const url = `${baseUrl}/doctors`;
    return this.http
      .get(url, this.header)
      .pipe(map((resp: any) => resp.doctors));
  }

  findDoctorById(id: string) {
    const url = `${baseUrl}/doctors/${id}`;
    return this.http
      .get(url, this.header)
      .pipe(map((resp: any) => resp.doctor));
  }

  createDopctor(doctor: { name: string; hospital: string }) {
    const url = `${baseUrl}/doctors`;
    return this.http.post(url, doctor, this.header);
  }

  updateDoctor(doctor: Doctor) {
    const url = `${baseUrl}/doctors/${doctor.id}`;
    return this.http.put(url, doctor, this.header);
  }

  deleteDoctor(id: string) {
    const url = `${baseUrl}/doctors/${id}`;
    return this.http.delete(url, this.header);
  }

  get header() {
    return {
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
    };
  }
}
