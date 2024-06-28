import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../services/sidebar.service';
import { SearchesService } from '../../services/searches.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SidebarComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public user?: User;
  @Output() sidebarToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  searchStatus: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private searchService: SearchesService
  ) {
    this.user = this.userService.user;
  }

  sidebarToogle() {
    this.menuStatus = !this.menuStatus;
    this.sidebarToggled.emit(this.menuStatus);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }

  search(termino: string) {
    if (termino.length < 0) {
      this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`dashboard/search/${termino}`);
  }

  aparecer() {
    this.searchStatus = !this.searchStatus;
  }
}
