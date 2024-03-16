import { Route } from '@angular/router';

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

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
