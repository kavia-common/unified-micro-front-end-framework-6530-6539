import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ToastService } from '../ui/ui.module';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="auth-wrapper">
    <div class="card">
      <h2>Reset password</h2>
      <p class="sub">Enter a new password for your account.</p>
      <form (ngSubmit)="submit()">
        <label>New Password</label>
        <input class="o-input" [(ngModel)]="password" name="password" type="password" required />
        <label>Confirm Password</label>
        <input class="o-input" [(ngModel)]="confirm" name="confirm" type="password" required />
        <button class="o-btn" [disabled]="loading()">Reset Password</button>
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
export class ResetPasswordComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  token = '';
  password = '';
  confirm = '';
  loading = signal(false);

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
  }

  submit() {
    if (this.password !== this.confirm) {
      this.toast.show('Passwords do not match.', 'error');
      return;
    }
    if (!this.token) {
      this.toast.show('Invalid or missing reset token.', 'error');
      return;
    }
    this.loading.set(true);
    this.auth.resetPassword(this.token, this.password).subscribe({
      next: () => {
        this.toast.show('Password reset successful. Please login.', 'success');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.toast.show('Password reset failed. Try again.', 'error');
        this.loading.set(false);
      }
    });
  }
}
