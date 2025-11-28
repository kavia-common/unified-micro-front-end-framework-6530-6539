import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="o-alert">
    <strong>Welcome!</strong> This is your dashboard shell.
  </div>
  <div style="height:16px"></div>
  <div class="card">
    <h3>Getting started</h3>
    <p>Use the sidebar to navigate between micro front-ends or features.</p>
  </div>
  `,
  styles: [`
    .card {
      background: var(--color-surface);
      border: 1px solid #e5e7eb;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      padding: 1rem;
      color: var(--color-text);
    }
  `]
})
export class DashboardComponent {}
