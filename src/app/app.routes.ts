import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.PAGES_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotpagefoundComponent,
  },
];
