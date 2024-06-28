import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchesService } from '../../services/searches.service';
import { Hospital } from '../../models/hospital.model';
import { ImgPipe } from '../../pipes/img.pipe';
import { Doctor } from '../../models/doctor.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-serches',
  standalone: true,
  imports: [ImgPipe],
  templateUrl: './serches.component.html',
  styleUrl: './serches.component.css',
})
export class SerchesComponent implements OnInit {
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];
  public users: User[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchesService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp: any) => {
      this.search(resp.termino);
    });
  }

  search(termino: string) {
    this.searchService.searchTotal(termino).subscribe((resp: any) => {
      this.hospitals = resp.hospitals;
      this.users = resp.users;
      this.doctors = resp.doctors;
    });
  }
}
