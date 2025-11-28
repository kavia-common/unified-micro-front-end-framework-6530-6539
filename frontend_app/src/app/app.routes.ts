import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell.component';
import { DashboardComponent } from './feature/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { authRoutes } from './auth/auth.routes';

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'feature', component: DashboardComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
