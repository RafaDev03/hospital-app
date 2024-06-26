import { Component, OnDestroy, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor.model';
import { ImgPipe } from '../../../pipes/img.pipe';
import { ModalService } from '../../../services/modal.service';
import { Subscription, delay } from 'rxjs';
import { SearchesService } from '../../../services/searches.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [ImgPipe, RouterLink],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit, OnDestroy {
  constructor(
    private doctorService: DoctorService,
    private modalService: ModalService,
    private searchService: SearchesService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.imgSub?.unsubscribe();
  }

  public doctors: Doctor[] = [];
  public loading: boolean = true;
  public imgSub?: Subscription;

  ngOnInit(): void {
    this.findDoctors();
    this.imgSub = this.modalService.newImg
      .pipe(delay(100))
      .subscribe((resp) => {
        this.findDoctors();
      });
  }

  findDoctors() {
    this.doctorService.findDoctors().subscribe((resp) => {
      this.loading = false;
      this.doctors = resp;
    });
  }

  cargarFoto(doctor: Doctor) {
    this.modalService.openModal('doctors', doctor);
  }

  searchDoctor(doctor: any) {
    if (doctor.trim().length <= 0) {
      this.findDoctors();
      return;
    }
    this.searchService.search('doctors', doctor).subscribe((resp: any[]) => {
      this.doctors = resp;
    });
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Esta Seguro de eliminar el doctor?',
      text: `Eliminar a ${doctor.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor.id).subscribe((resp: any) => {
          if (resp.ok) {
            this.findDoctors();
            Swal.fire({
              title: 'Deleted!',
              text: `The Doctor ${doctor.name} was deleted`,
              icon: 'success',
            });
          }
        });
      }
    });
  }
}
