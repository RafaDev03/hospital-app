import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  async updatePhoto(
    file: File,
    tipo: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${base_url}/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });
      const data = await res.json();
      if (data.ok) {
        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  updatePhoto1(
    file: File,
    tipo: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    const url = `${base_url}/uploads/${tipo}/${id}`;
    const formData = new FormData();
    formData.append('image', file);
    return this.http.put(url, formData, {
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
    });
  }
}
