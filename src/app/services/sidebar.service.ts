import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'bi bi-border-all',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Grafica1', url: 'grafica1' },
        { title: 'Promises', url: 'promises' },
        { title: 'RxJs', url: 'rxjs' },
      ],
    },
    {
      title: 'Mantenimiento',
      icon: 'bi bi-body-text',
      submenu: [
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Doctors', url: 'doctors' },
      ],
    },
  ];

  private sidebarSubject = new Subject<void>();
  sidebarState$ = this.sidebarSubject.asObservable();

  clickSidebar() {
    console.log('hello');
    this.sidebarSubject.next();
  }

  constructor() {}
}
