import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {}
  private sidebarVisible = new BehaviorSubject<boolean>(false);

  getSidebarVisibility() {
    return this.sidebarVisible.asObservable();
  }

  toggleSidebarVisibility() {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }
}
