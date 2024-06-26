import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import { ImgPipe } from '../../../../pipes/img.pipe';
import { ModalService } from '../../../../services/modal.service';
import { DoctorService } from '../../../../services/doctor.service';
import { Doctor } from '../../../../models/doctor.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, delay, of } from 'rxjs';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, ImgPipe],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css',
})
export class DoctorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private modalService: ModalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSelected?: Hospital;
  public doctorSeleceted?: Doctor;
  public imgSub?: Subscription;

  ngOnInit(): void {
    this.findHospitals();
    this.fidDoctorById();
    this.newImagen();
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.doctorForm
      .get('hospital')
      ?.valueChanges.pipe(delay(100))
      .subscribe((hospitalId) => {
        this.hospitalSelected = this.hospitals.find((h) => h.id === hospitalId);
      });
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;
    if (this.doctorSeleceted) {
      const data = {
        ...this.doctorForm.value,
        id: this.doctorSeleceted?.id,
      };
      this.doctorService.updateDoctor(data).subscribe((resp) => {
        console.log(resp);
        Swal.fire('Update', `${name} actualizado correctamente`, 'success');
      });
    } else {
      this.doctorService
        .createDopctor(this.doctorForm.value)
        .subscribe((resp: any) => {
          if (resp.ok) {
            Swal.fire('Created', `${name} creado correctamente`, 'success');
            this.router.navigateByUrl(`dashboard/doctor/${resp.doctor.id}`);
          }
        });
    }
  }

  findHospitals() {
    this.hospitalService.findHospitals().subscribe((resp) => {
      this.hospitals = resp;
    });
  }

  fidDoctorById() {
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id === 'create') {
        return;
      }
      this.doctorService
        .findDoctorById(id)
        .pipe(
          catchError((error) => {
            this.router.navigateByUrl('dashboard/doctors');
            return of(null);
          })
        )
        .subscribe((resp: any) => {
          if (!resp) {
            return;
          }
          this.doctorSeleceted = resp;
          const {
            name,
            hospital: { _id },
          } = resp;
          this.doctorForm.setValue({ name, hospital: _id });
        });
    });
  }

  openModal(doctor: Doctor) {
    this.modalService.openModal('doctors', doctor);
  }
  cancel() {
    this.router.navigateByUrl('dashboard/doctors');
  }

  newImagen() {
    this.imgSub = this.modalService.newImg
      .pipe(delay(100))
      .subscribe((resp) => {
        this.fidDoctorById();
      });
  }
}
