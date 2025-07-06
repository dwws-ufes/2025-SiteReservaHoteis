import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAdmin = auth.isAdmin();
  if (!isAdmin) {
    router.navigate(['/']);
    return false;
  }

  return isAdmin;
};
