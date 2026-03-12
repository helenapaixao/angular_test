import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar__inner container">
        <a routerLink="/" class="navbar__logo">
          <span class="navbar__logo-icon">🐱</span>
          <span class="navbar__logo-group">
            <span class="navbar__logo-text">CatGallery</span>
          </span>
        </a>

        <ul class="navbar__links">
          <li>
            <a
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              class="navbar__link"
            >
              Home
            </a>
          </li>
          <li>
            <a
              routerLink="/cats"
              routerLinkActive="active"
              class="navbar__link"
            >
              Gatos
            </a>
          </li>
          <li>
            <a
              routerLink="/about"
              routerLinkActive="active"
              class="navbar__link"
            >
              Sobre
            </a>
          </li>
        </ul>

        <button class="navbar__mobile-toggle" (click)="toggleMenu()">
          <span class="navbar__hamburger" [class.open]="menuOpen">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      @if (menuOpen) {
        <div class="navbar__mobile-menu">
          <a routerLink="/" (click)="closeMenu()" class="navbar__mobile-link"
            >Home</a
          >
          <a
            routerLink="/cats"
            (click)="closeMenu()"
            class="navbar__mobile-link"
            >Gatos</a
          >
          <a
            routerLink="/about"
            (click)="closeMenu()"
            class="navbar__mobile-link"
            >Sobre</a
          >
        </div>
      }
    </nav>
  `,
  styles: [
    `
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(15, 15, 15, 0.85);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid var(--color-border);
        height: 72px;
      }

      .navbar__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
      }

      .navbar__logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-text);
        font-weight: 700;
        font-size: 1.1rem;
        letter-spacing: -0.02em;
      }

      .navbar__logo:hover {
        color: var(--color-text);
      }

      .navbar__logo-icon {
        color: var(--color-accent);
        font-size: 1.25rem;
      }

      .navbar__logo-group {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .navbar__logo-by {
        font-size: 0.65rem;
        font-weight: 400;
        color: var(--color-text-muted);
        letter-spacing: 0.01em;
      }

      .navbar__links {
        display: flex;
        list-style: none;
        gap: 0.25rem;
      }

      .navbar__link {
        display: block;
        padding: 0.5rem 1rem;
        color: var(--color-text-muted);
        font-size: 0.9rem;
        font-weight: 500;
        border-radius: var(--radius-sm);
        transition: all var(--transition-fast);
      }

      .navbar__link:hover {
        color: var(--color-text);
        background: var(--color-surface);
      }

      .navbar__link.active {
        color: var(--color-accent);
        background: var(--color-accent-soft);
      }

      .navbar__mobile-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
      }

      .navbar__hamburger {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 22px;
      }

      .navbar__hamburger span {
        display: block;
        height: 2px;
        background: var(--color-text);
        border-radius: 2px;
        transition: all var(--transition-fast);
      }

      .navbar__hamburger.open span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      .navbar__hamburger.open span:nth-child(2) {
        opacity: 0;
      }

      .navbar__hamburger.open span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }

      .navbar__mobile-menu {
        display: none;
        flex-direction: column;
        padding: 1rem 1.5rem 1.5rem;
        background: var(--color-surface);
        border-bottom: 1px solid var(--color-border);
        animation: fadeIn 0.2s ease-out;
      }

      .navbar__mobile-link {
        display: block;
        padding: 0.75rem 0;
        color: var(--color-text-muted);
        font-weight: 500;
        border-bottom: 1px solid var(--color-border);
      }

      .navbar__mobile-link:last-child {
        border-bottom: none;
      }

      @media (max-width: 768px) {
        .navbar__links {
          display: none;
        }

        .navbar__mobile-toggle {
          display: block;
        }

        .navbar__mobile-menu {
          display: flex;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
