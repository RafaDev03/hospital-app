import { Route } from '@angular/router';
import { PagesComponent } from './pages.component';

export const PAGES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./progress/progress.component').then((m) => m.ProgressComponent),
  },
  {
    path: 'grafica1',
    loadComponent: () =>
      import('./grafica1/grafica1.component').then((m) => m.Grafica1Component),
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
