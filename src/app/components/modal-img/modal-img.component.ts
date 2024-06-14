import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-img.component.html',
  styleUrl: './modal-img.component.css',
})
export class ModalImgComponent implements OnInit {
  public user?: User;
  public imageSubir?: File;
  public imgTemp: any;
  @ViewChild('myModal', { static: false }) exampleModal?: ElementRef;

  constructor(
    public modalService: ModalService,
    private fileUploadService: FileUploadService,
    private userService: UserService
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.modalService.modalState$.subscribe(() => {
      this.openModal();
    });
  }

  openModal() {
    if (this.exampleModal) {
      (this.exampleModal.nativeElement as HTMLElement).style.display = 'block';
    }
  }

  close() {
    if (this.exampleModal) {
      this.imgTemp = null;
      (this.exampleModal.nativeElement as HTMLElement).style.display = 'none';
    }
  }

  cambiarImagen(event: any) {
    this.imageSubir = event.target.files[0];
    if (!this.imageSubir) {
      this.imgTemp = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imageSubir);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    const id = this.modalService.id;
    const tipo = this.modalService.tipo as 'users' | 'doctors' | 'hospitals';
    this.fileUploadService
      .updatePhoto(this.imageSubir!, tipo, id || '')
      .then((img) => {
        Swal.fire('Guardado', 'Imagen actualizada con éxito', 'success');
        this.close();
        this.modalService.newImg.emit(img);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
