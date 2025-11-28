import { Component, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ToastService } from '../ui/ui.module';

@Component({
  selector: 'app-mfa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="auth-wrapper">
    <div class="card">
      <h2>Multi‑Factor Authentication</h2>
      <p class="sub">Enter the 6‑digit code from your authenticator app.</p>
      <form (ngSubmit)="submit()">
        <label>Verification Code</label>
        <input class="o-input" [(ngModel)]="code" name="code" maxlength="6" required />
        <button class="o-btn" [disabled]="loading()">Verify</button>
        <button class="o-btn ghost" type="button" (click)="goBack()">Back</button>
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
export class MfaComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);
  private toast = inject(ToastService);

  username = '';
  code = '';
  loading = signal(false);

  ngOnInit() {
    this.username = this.route.snapshot.queryParamMap.get('username') ?? '';
  }

  submit() {
    if (!this.username) {
      this.toast.show('Missing username context for MFA.', 'error');
      return;
    }
    this.loading.set(true);
    this.auth.completeMfa(this.username, this.code).subscribe({
      next: (res) => {
        this.auth.persistTokens(res.accessToken, res.refreshToken);
        this.router.navigate(['/']);
      },
      error: () => {
        this.toast.show('Invalid code. Try again.', 'error');
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/auth/login'], { queryParams: { username: this.username } });
  }
}
