import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  public registerForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    //Realizar la creación de user
    this.userService.createUser(this.registerForm.value).subscribe(
      (response) => {
        if (response.ok === true) {
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        //Si sucede un error

        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
  campoNoValid(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }
  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordNoValid() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass1 === pass2) {
      return false;
    } else {
      return true;
    }
  }
  passwordsIguales(passName1: string, passName2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(passName1);
      const pass2Control = formGroup.get(passName2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
