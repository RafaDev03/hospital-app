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
import { FileUploadService } from '../../services/file-upload.service';

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
  public imageSubir?: File;
  public imgTemp: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {
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
    this.userService.updateUser(this.profileForm.value).subscribe(
      (res) => {
        const { name, email } = this.profileForm.value;
        this.user!.name = name;
        this.user!.email = email;
        Swal.fire('Guardado', 'Usuario actualizado con éxito!', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  cambiarImagen(event: any) {
    this.imageSubir = event.target.files[0];
    if (!this.imageSubir) {
      this.imgTemp = null;
      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.imageSubir);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    this.fileUploadService
      .updatePhoto(this.imageSubir!, 'users', this.user?.id || '')
      .then((img) => {
        this.user!.img = img;
        Swal.fire('Guardado', 'Imagen actualizada con éxito', 'success');
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
