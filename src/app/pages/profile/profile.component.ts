import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  public user?: User;
  public profileForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.user = this.userService.user;
  }
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      role: ['USER_ROLE', Validators.required],
    });
  }

  public updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value).subscribe((res) => {
      const { name, email } = this.profileForm.value;
      this.user!.name = name;
      this.user!.email = email;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario Actualizado con éxito',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
}
