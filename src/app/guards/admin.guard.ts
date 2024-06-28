import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  if (userService.role === 'ADMIN_ROLE') {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
