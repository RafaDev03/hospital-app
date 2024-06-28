import { Route } from '@angular/router';
import { adminGuard } from '../guards/admin.guard';

export const PAGES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    data: { title: 'Dashboard' },
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./progress/progress.component').then((m) => m.ProgressComponent),
    data: { title: 'ProgressBar' },
  },
  {
    path: 'grafica1',
    loadComponent: () =>
      import('./grafica1/grafica1.component').then((m) => m.Grafica1Component),
    data: { title: 'Grafica1' },
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    data: { title: 'Profile' },
  },
  {
    path: 'promises',
    loadComponent: () =>
      import('./promises/promises.component').then((m) => m.PromisesComponent),
    data: { title: 'Promises' },
  },
  {
    path: 'rxjs',
    loadComponent: () =>
      import('./rxjs/rxjs.component').then((m) => m.RxjsComponent),
    data: { title: 'RxJs' },
  },

  //Mantenimientos
  {
    path: 'users',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./mantenimentos/users/users.component').then(
        (m) => m.UsersComponent
      ),
    data: { title: 'Users' },
  },
  {
    path: 'doctors',
    loadComponent: () =>
      import('./mantenimentos/doctors/doctors.component').then(
        (m) => m.DoctorsComponent
      ),
    data: { title: 'Doctors' },
  },
  {
    path: 'doctor/:id',
    loadComponent: () =>
      import('./mantenimentos/doctors/doctor/doctor.component').then(
        (m) => m.DoctorComponent
      ),
    data: { title: 'Mantenimiento Doctor' },
  },
  {
    path: 'hospitals',
    loadComponent: () =>
      import('./mantenimentos/hospitals/hospitals.component').then(
        (m) => m.HospitalsComponent
      ),
    data: { title: 'hospitals' },
  },
  {
    path: 'search/:termino',
    loadComponent: () =>
      import('../pages/serches/serches.component').then(
        (m) => m.SerchesComponent
      ),
    data: { title: 'searches' },
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
