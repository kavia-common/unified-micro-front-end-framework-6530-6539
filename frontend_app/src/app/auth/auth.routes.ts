import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { MfaComponent } from './mfa.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';
import { publicGuard } from '../core/guards/public.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    canActivate: [publicGuard],
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'mfa',
    canActivate: [publicGuard],
    component: MfaComponent,
    title: 'MFA'
  },
  {
    path: 'forgot',
    canActivate: [publicGuard],
    component: ForgotPasswordComponent,
    title: 'Forgot Password'
  },
  {
    path: 'reset',
    canActivate: [publicGuard],
    component: ResetPasswordComponent,
    title: 'Reset Password'
  }
];
