import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="app-layout">
      <app-navbar />
      <main class="app-main">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: [
    `
      .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .app-main {
        flex: 1;
        padding-top: 72px; /* navbar height */
      }
    `,
  ],
})
export class AppComponent {}
