import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * PUBLIC_INTERFACE
 * PublicGuard redirects authenticated users away from public auth routes to home.
 */
export const publicGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.hasToken()) {
    return router.parseUrl('/');
  }
  return true;
};
