import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
  <div class="shell">
    <aside [class.collapsed]="collapsed()">
      <div class="brand">
        <span class="dot"></span>
        <span class="name">Ocean</span>
      </div>
      <nav>
        <a routerLink="/" class="item">Dashboard</a>
        <a routerLink="/feature" class="item">Feature</a>
      </nav>
    </aside>

    <main>
      <header>
        <button class="o-btn ghost" (click)="toggleSidebar()">☰</button>
        <div class="spacer"></div>
        <div class="user" *ngIf="isAuth(); else guest">
          <span class="avatar">U</span>
          <button class="o-btn secondary" (click)="logout()">Logout</button>
        </div>
        <ng-template #guest>
          <a routerLink="/auth/login" class="o-btn">Login</a>
        </ng-template>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  </div>
  `,
  styles: [`
    .shell { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; background: var(--color-bg); }
    aside { border-right: 1px solid #e5e7eb; background: var(--color-surface); padding: 1rem; transition: width 200ms ease; }
    aside.collapsed { width: 72px; }
    .brand { display:flex; align-items:center; gap:.5rem; font-weight:700; color: var(--color-text); margin-bottom: 1rem; }
    .brand .dot { width:10px; height:10px; border-radius:50%; background: var(--color-primary); display:inline-block; }
    nav { display: grid; gap: .25rem; }
    .item { padding: .5rem .75rem; border-radius: var(--radius-md); color: var(--color-text); text-decoration: none; }
    .item:hover { background: rgba(37,99,235,0.08); }
    main { display: grid; grid-template-rows: auto 1fr; }
    header { display:flex; align-items:center; gap:.5rem; padding:.75rem 1rem; background: var(--color-surface); border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 10; }
    .spacer { flex: 1; }
    .avatar { width: 28px; height: 28px; border-radius: 50%; display: inline-grid; place-items:center; background: rgba(37,99,235,0.15); color: var(--color-primary); font-weight: 700; }
    .content { padding: 1rem; }
    @media (max-width: 900px) {
      .shell { grid-template-columns: 72px 1fr; }
    }
  `]
})
export class AppShellComponent {
  private auth = inject(AuthService);
  collapsed = signal(false);

  toggleSidebar() { this.collapsed.set(!this.collapsed()); }
  isAuth() { return this.auth.hasToken(); }
  logout() { this.auth.logout(); }
}
