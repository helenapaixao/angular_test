import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="about-page">
      <div class="container">
        <div class="page-header">
          <h1 class="section-title">Sobre o Projeto</h1>
        </div>

        <div class="stack-section">
          <h2 class="section-subtitle">Tecnologias</h2>
          <div class="stack-list">
            <span class="stack-item">Angular 18</span>
            <span class="stack-item">TypeScript</span>
            <span class="stack-item">RxJS</span>
            <span class="stack-item">HttpClient</span>
            <span class="stack-item">Standalone Components</span>
            <span class="stack-item">The Cat API</span>
          </div>
        </div>

        <!-- Estrutura -->
        <div class="architecture">
          <h2 class="section-subtitle">Estrutura</h2>
          <div class="file-tree">
            <pre class="file-tree__code">
src/app/
├── components/
│   ├── navbar/
│   └── footer/
├── pages/
│   ├── home/
│   ├── cats/
│   └── about/
├── services/
│   └── cat.service.ts
├── models/
│   └── cat.model.ts
└── app.routes.ts</pre>
          </div>
        </div>

        <div class="api-section">
          <h2 class="section-subtitle">API Utilizada — The Cat API</h2>
          <div class="api-card">
            <div class="api-card__header">
              <span class="api-card__method">GET</span>
              <code class="api-card__url">
                /images/search?limit=1&amp;has_breeds=1
              </code>
            </div>
            <p class="api-card__desc">
              Busca uma imagem aleatória de gato com raça associada. Aceita
              <code>breed_ids</code> para filtrar por raça.
            </p>
          </div>
          <div class="api-card">
            <div class="api-card__header">
              <span class="api-card__method">GET</span>
              <code class="api-card__url">/breeds</code>
            </div>
            <p class="api-card__desc">
              Lista todas as raças disponíveis com descrição, temperamento,
              origem e esperança de vida.
            </p>
          </div>
        </div>

        <a routerLink="/cats" class="btn btn--primary">Ver Gatos →</a>
      </div>
    </section>
  `,
  styles: [
    `
      .about-page {
        padding: 3rem 0 5rem;
      }

      .page-header {
        margin-bottom: 3rem;
      }

      .page-header__subtitle {
        color: var(--color-text-muted);
        font-size: 0.95rem;
        margin-top: -0.5rem;
        max-width: 540px;
      }

      .section-subtitle {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: 0.78rem;
        margin-bottom: 1rem;
      }

      .stack-section {
        margin-bottom: 2.5rem;
      }

      .stack-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .stack-item {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        padding: 0.35rem 0.85rem;
        font-size: 0.85rem;
        font-family: var(--font-mono);
        color: var(--color-text-muted);
      }

      .architecture {
        margin-bottom: 2.5rem;
      }

      .file-tree {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
      }

      .file-tree__code {
        padding: 1.25rem 1.5rem;
        font-family: var(--font-mono);
        font-size: 0.85rem;
        line-height: 1.7;
        color: var(--color-text-muted);
        overflow-x: auto;
        margin: 0;
      }

      .api-section {
        margin-bottom: 2.5rem;
      }

      .api-card {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem 1.5rem;
        margin-bottom: 0.75rem;
      }

      .api-card__header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
      }

      .api-card__method {
        display: inline-flex;
        padding: 0.2rem 0.5rem;
        background: rgba(74, 222, 128, 0.12);
        color: #4ade80;
        font-size: 0.7rem;
        font-weight: 700;
        font-family: var(--font-mono);
        border-radius: 3px;
        letter-spacing: 0.05em;
      }

      .api-card__url {
        font-family: var(--font-mono);
        font-size: 0.82rem;
        color: var(--color-text);
      }

      .api-card__desc {
        font-size: 0.85rem;
        color: var(--color-text-muted);
        line-height: 1.6;
      }

      .api-card__desc code {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--color-accent);
        background: var(--color-accent-soft);
        padding: 0.1em 0.35em;
        border-radius: 3px;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
        font-weight: 600;
        border-radius: var(--radius-sm);
        transition: all var(--transition-fast);
        cursor: pointer;
        border: none;
        font-family: var(--font-body);
      }

      .btn--primary {
        background: var(--color-accent);
        color: #fff;
      }

      .btn--primary:hover {
        background: var(--color-accent-hover);
        color: #fff;
        transform: translateY(-1px);
      }
    `,
  ],
})
export class AboutComponent {}
