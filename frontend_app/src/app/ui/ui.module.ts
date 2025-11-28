import { NgModule, Injectable, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'o-toast-host',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="o-toast-container" *ngIf="toasts().length">
      <div *ngFor="let t of toasts()" class="o-toast" [class.error]="t.type==='error'" [class.success]="t.type==='success'">
        {{ t.message }}
      </div>
    </div>
  `
})
export class ToastHostComponent {
  toasts = signal<{ message: string; type?: 'error' | 'success' }[]>([]);
}

declare function setTimeout(handler: (...args: any[]) => void, timeout?: number): any;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private host?: ToastHostComponent;

  register(host: ToastHostComponent) {
    this.host = host;
  }

  // PUBLIC_INTERFACE
  show(message: string, type?: 'error' | 'success') {
    if (!this.host) return;
    const list = this.host.toasts();
    this.host.toasts.set([...list, { message, type }]);
    if (typeof setTimeout !== 'undefined') {
      setTimeout(() => {
        const l = this.host!.toasts();
        this.host!.toasts.set(l.slice(1));
      }, 3000);
    }
  }
}

@NgModule({
  imports: [CommonModule],
})
export class UiModule {}
