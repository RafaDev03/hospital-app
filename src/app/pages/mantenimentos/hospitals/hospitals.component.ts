import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { CommonModule } from '@angular/common';
import { ImgPipe } from '../../../pipes/img.pipe';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
import { Subscription, delay } from 'rxjs';
import { SearchesService } from '../../../services/searches.service';

@Component({
  selector: 'app-hospitals',
  standalone: true,
  imports: [CommonModule, ImgPipe, FormsModule],
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css',
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public loading: boolean = false;
  public imgSub?: Subscription;
  constructor(
    private hospitalService: HospitalService,
    private modalService: ModalService,
    private searchService: SearchesService
  ) {}
  ngOnDestroy(): void {
    this.imgSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.findHospitals();
    this.imgSub = this.modalService.newImg.pipe(delay(100)).subscribe((img) => {
      this.findHospitals();
    });
  }

  findHospitals() {
    this.hospitalService.findHospitals().subscribe((resp: Hospital[]) => {
      this.hospitals = resp;
      this.loading = true;
    });
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital.name, hospital.id!)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.name, 'success');
      });
  }

  deleteHospitals(hospital: Hospital) {
    Swal.fire({
      title: 'Deleted Hospital?',
      text: `Are you sure delete the hospital ${hospital.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService
          .deleteHospital(hospital.id!)
          .subscribe((resp: any) => {
            if (resp.ok) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
              this.findHospitals();
            }
          });
      }
    });
  }

  async apenSweetAlet() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Agregar Hospital',
      input: 'text',
      text: 'Ingrese el nombre',
      inputPlaceholder: 'Enter the name',
      showCancelButton: true,
    });
    if (value!.trim().length > 0) {
      this.hospitalService.createHospital(value!).subscribe((resp: any) => {
        if (resp.ok) {
          this.findHospitals();
        }
      });
    } else {
      return;
    }
    console.log(value);
  }

  search(hospital: string) {
    if (hospital.trim().length <= 0) {
      return;
    }
    this.searchService.search('hospitals', hospital).subscribe((resp: any) => {
      this.hospitals = resp;
    });
  }

  openModal(hospital: Hospital) {
    this.modalService.openModal('hospitals', hospital);
  }
}
