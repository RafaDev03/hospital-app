import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public tipo?: string;
  public id?: string;
  public img?: string;

  public newImg: EventEmitter<string> = new EventEmitter();

  private modalSubject = new Subject<void>();

  modalState$ = this.modalSubject.asObservable();

  openModal(tipo: 'users' | 'doctor' | 'hospital', user: User) {
    this.id = user.id;
    this.tipo = tipo;
    this.img = `${baseUrl}/uploads/${tipo}/${user.img}`;

    this.modalSubject.next();
  }

  saveModal() {}

  constructor() {}
}
