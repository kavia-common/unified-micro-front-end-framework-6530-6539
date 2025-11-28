import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * PUBLIC_INTERFACE
 * AuthGuard protects private routes. Redirects to /auth/login if unauthenticated.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.hasToken()) {
    return true;
  }
  return router.parseUrl('/auth/login');
};
