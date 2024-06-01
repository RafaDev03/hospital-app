import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginForm } from '../../interfaces/login-form.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    SocialLoginModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user!: SocialUser;
  loggedIn!: boolean;

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private fb: FormBuilder,
    private userServide: UserService
  ) {}
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false, Validators.required],
  });

  login() {
    this.userServide.loginUser(this.loginForm.value as LoginForm).subscribe(
      (res: any) => {
        console.log(res);
        if (res.ok && res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          Swal.fire('Error', 'Login is failed', 'error');
        }
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
