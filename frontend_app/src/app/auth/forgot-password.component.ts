import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { ToastService } from '../ui/ui.module';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="auth-wrapper">
    <div class="card">
      <h2>Forgot password</h2>
      <p class="sub">Enter your email to receive a reset link.</p>
      <form (ngSubmit)="submit()">
        <label>Email</label>
        <input class="o-input" [(ngModel)]="email" name="email" type="email" required />
        <button class="o-btn" [disabled]="loading()">Send reset link</button>
      </form>
    </div>
  </div>
  `,
  styles: [`
    .auth-wrapper { min-height: 100vh; display: grid; place-items: center; background: var(--gradient-accent); padding: 2rem; }
    .card { background: var(--color-surface); border: 1px solid #e5e7eb; border-radius: var(--radius-md); box-shadow: var(--shadow-md); width: 100%; max-width: 420px; padding: 1.5rem; }
    h2 { color: var(--color-text); margin-bottom: .25rem; }
    .sub { color: #6b7280; margin-bottom: 1rem; }
    form { display: grid; gap: .75rem; }
    label { font-size: .875rem; color: #374151; }
  `]
})
export class ForgotPasswordComponent {
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  email = '';
  loading = signal(false);

  submit() {
    this.loading.set(true);
    this.auth.requestPasswordReset(this.email).subscribe({
      next: () => {
        this.toast.show('If an account exists, a reset link has been sent.', 'success');
        this.loading.set(false);
      },
      error: () => {
        this.toast.show('Unable to send reset link. Try again later.', 'error');
        this.loading.set(false);
      }
    });
  }
}
