import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a routerLink="/" class="footer__logo">
              <span class="footer__logo-icon">🐱</span>
              CatGallery
            </a>
            <p class="footer__description">
              Galeria de gatos. Angular com routing,
              componentes standalone e integração com The Cat API.
            </p>
          </div>

          <div class="footer__section">
            <h4 class="footer__heading">Navegação</h4>
            <ul class="footer__list">
              <li><a routerLink="/" class="footer__link">Home</a></li>
              <li><a routerLink="/cats" class="footer__link">Gatos</a></li>
              <li><a routerLink="/about" class="footer__link">Sobre</a></li>
            </ul>
          </div>

          <div class="footer__section">
            <h4 class="footer__heading">Tecnologias</h4>
            <ul class="footer__list">
              <li class="footer__tech">Angular 18</li>
              <li class="footer__tech">TypeScript</li>
              <li class="footer__tech">Standalone Components</li>
              <li class="footer__tech">HttpClient</li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p class="footer__copyright">
            &copy; {{ currentYear }} Helena Paixão
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: var(--color-surface);
        border-top: 1px solid var(--color-border);
        padding: 3rem 0 1.5rem;
        margin-top: auto;
      }

      .footer__grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 3rem;
        margin-bottom: 2.5rem;
      }

      .footer__logo {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-text);
        font-weight: 700;
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
      }

      .footer__logo:hover {
        color: var(--color-text);
      }

      .footer__logo-icon {
        color: var(--color-accent);
      }

      .footer__description {
        color: var(--color-text-muted);
        font-size: 0.875rem;
        line-height: 1.7;
        max-width: 320px;
      }

      .footer__heading {
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-text);
        margin-bottom: 1rem;
      }

      .footer__list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .footer__link {
        color: var(--color-text-muted);
        font-size: 0.875rem;
        transition: color var(--transition-fast);
      }

      .footer__link:hover {
        color: var(--color-accent);
      }

      .footer__tech {
        color: var(--color-text-muted);
        font-size: 0.875rem;
        font-family: var(--font-mono);
      }

      .footer__bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1.5rem;
        border-top: 1px solid var(--color-border);
      }

      .footer__copyright,
      .footer__api-credit {
        font-size: 0.8rem;
        color: var(--color-text-muted);
      }

      @media (max-width: 768px) {
        .footer__grid {
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .footer__bottom {
          flex-direction: column;
          gap: 0.5rem;
          text-align: center;
        }
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
