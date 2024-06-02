import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public user?: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth']);
  }
}
