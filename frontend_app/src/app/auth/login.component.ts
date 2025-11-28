import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ToastService, ToastHostComponent } from '../ui/ui.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ToastHostComponent],
  template: `
  <div class="auth-wrapper">
    <o-toast-host #toastHost></o-toast-host>
    <div class="card">
      <h2>Welcome back</h2>
      <p class="sub">Sign in to continue</p>
      <form (ngSubmit)="submit()">
        <label>Username</label>
        <input class="o-input" [(ngModel)]="username" name="username" required />
        <label>Password</label>
        <input class="o-input" [(ngModel)]="password" name="password" type="password" required />
        <button class="o-btn" [disabled]="loading()">Sign in</button>
      </form>
      <div class="helpers">
        <a routerLink="/auth/forgot">Forgot password?</a>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: var(--gradient-accent);
      padding: 2rem;
    }
    .card {
      background: var(--color-surface);
      border: 1px solid #e5e7eb;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      width: 100%;
      max-width: 420px;
      padding: 1.5rem;
    }
    h2 { color: var(--color-text); margin-bottom: .25rem; }
    .sub { color: #6b7280; margin-bottom: 1rem; }
    form { display: grid; gap: .75rem; }
    label { font-size: .875rem; color: #374151; }
    .helpers { margin-top: .75rem; }
    a { color: var(--color-primary); text-decoration: none; }
  `]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  username = '';
  password = '';
  loading = signal(false);

  ngAfterViewInit() {
    // no-op; ToastHost is local, service will use the nearest registered host if needed
  }

  submit() {
    this.loading.set(true);
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        if (res.requiresMfa) {
          this.router.navigate(['/auth/mfa'], { queryParams: { username: this.username }});
          return;
        }
        this.auth.persistTokens(res.accessToken, res.refreshToken);
        this.router.navigate(['/']);
      },
      error: () => {
        this.toast.show('Login failed. Check your credentials.', 'error');
        this.loading.set(false);
      }
    });
  }
}
