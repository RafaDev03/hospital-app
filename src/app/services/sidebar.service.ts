import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu = [];
  constructor() {
    this.cargarMenu();
  }

  cargarMenu() {
    const menu = localStorage.getItem('menu');
    this.menu = menu ? JSON.parse(menu) : [];
  }
}
