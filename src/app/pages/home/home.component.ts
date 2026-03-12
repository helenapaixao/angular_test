import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatService } from '../../services/cat.service';
import { CatImage } from '../../models/cat.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">
            Galeria de<br />
            <span class="hero__highlight">Gatos</span>
          </h1>
          <div class="hero__actions">
            <a routerLink="/cats" class="btn btn--primary">Ver Gatos →</a>
            <a routerLink="/about" class="btn btn--outline">Sobre o Projeto</a>
          </div>
        </div>

      </div>
    </section>

    <section class="preview-section">
      <div class="container">
        <div class="preview-section__header">
          <h2 class="section-title">Gatos em Destaque</h2>
          <div class="preview-section__actions">
            <button
              class="btn btn--outline btn--sm"
              (click)="refreshImages()"
              [disabled]="loading || refreshing"
            >
              @if (loading || refreshing) {
                <span class="spinner-sm"></span>
              } @else {
                ↻
              }
              Novas imagens
            </button>
          </div>
        </div>

        @if (loading) {
          <div class="preview-single">
            <div class="skeleton-card">
              <div class="skeleton skeleton--image"></div>
            </div>
          </div>
        } @else if (!error && cats.length > 0) {
          <div class="preview-single">
            <article class="cat-preview-card">
              <div class="cat-preview-card__img-wrapper">
                <img
                  [src]="cats[0].url"
                  [alt]="cats[0].breeds.length > 0 ? cats[0].breeds[0].name : 'Gato'"
                  class="cat-preview-card__img"
                />
                @if (refreshing) {
                  <div class="cat-preview-card__overlay">
                    <span class="spinner-lg"></span>
                  </div>
                }
              </div>
              <div class="cat-preview-card__footer">
                @if (cats[0].breeds.length > 0) {
                  <span class="cat-preview-card__name">{{ cats[0].breeds[0].name }}</span>
                  <span class="cat-preview-card__origin">{{ cats[0].breeds[0].origin }}</span>
                } @else {
                  <span class="cat-preview-card__name">Gato</span>
                }
              </div>
            </article>
          </div>
          <div class="preview-section__cta">
            <a routerLink="/cats" class="btn btn--outline">
              Ver todas as imagens →
            </a>
          </div>
        }

        @if (error) {
          <div class="error-message">
            <span>⚠️</span>
            <p>{{ error }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      /* Hero */
      .hero {
        padding: 5rem 0 4rem;
        position: relative;
        overflow: hidden;
      }

      .hero::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 600px;
        height: 600px;
        background: radial-gradient(
          circle,
          rgba(232, 93, 58, 0.08) 0%,
          transparent 70%
        );
        pointer-events: none;
      }

      .hero__content {
        max-width: 640px;
        margin-bottom: 4rem;
      }

      .hero__title {
        font-size: 3.5rem;
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: -0.04em;
        margin: 1.25rem 0;
        color: var(--color-text);
      }

      .hero__highlight {
        color: var(--color-accent);
      }

      .hero__subtitle {
        font-size: 1.1rem;
        color: var(--color-text-muted);
        line-height: 1.7;
        max-width: 520px;
        margin-bottom: 2rem;
      }

      .hero__actions {
        display: flex;
        gap: 0.75rem;
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

      .btn--outline {
        background: transparent;
        color: var(--color-text-muted);
        border: 1px solid var(--color-border);
      }

      .btn--outline:hover {
        color: var(--color-text);
        border-color: var(--color-text-muted);
      }

      /* Preview Section */
      .preview-section {
        padding: 3rem 0 5rem;
      }

      .preview-section__header {
        margin-bottom: 2rem;
      }

      .preview-section__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: -0.5rem;
      }

      .preview-section__subtitle {
        color: var(--color-text-muted);
        font-size: 0.95rem;
      }

      .btn--sm {
        padding: 0.45rem 1rem;
        font-size: 0.82rem;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
      }

      .spinner-sm {
        display: inline-block;
        width: 13px;
        height: 13px;
        border: 2px solid var(--color-border);
        border-top-color: var(--color-accent);
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .preview-single {
        display: flex;
        justify-content: center;
      }

      .cat-preview-card {
        width: 100%;
        max-width: 480px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: all var(--transition-base);
        animation: fadeInUp 0.5s ease-out both;
      }

      .cat-preview-card:hover {
        border-color: var(--color-text-muted);
        transform: translateY(-3px);
      }

      .cat-preview-card__img-wrapper {
        width: 100%;
        padding-top: 85%;
        position: relative;
        background: var(--color-surface-hover);
      }

      .cat-preview-card__img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-base);
      }

      .cat-preview-card:hover .cat-preview-card__img {
        transform: scale(1.04);
      }

      .cat-preview-card__overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }

      .spinner-lg {
        display: inline-block;
        width: 36px;
        height: 36px;
        border: 3px solid var(--color-border);
        border-top-color: var(--color-accent);
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }

      .cat-preview-card__footer {
        padding: 0.85rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .cat-preview-card__name {
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-text);
      }

      .cat-preview-card__origin {
        font-size: 0.78rem;
        color: var(--color-accent);
        font-family: var(--font-mono);
      }

      .preview-section__cta {
        margin-top: 2rem;
        text-align: center;
      }

      /* Skeleton */
      .skeleton-card {
        width: 100%;
        max-width: 480px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
      }

      .skeleton {
        background: linear-gradient(
          90deg,
          var(--color-border) 25%,
          var(--color-surface-hover) 50%,
          var(--color-border) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }

      .skeleton--image {
        width: 100%;
        padding-top: 85%;
      }

      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }

      /* Error */
      .error-message {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        background: rgba(232, 93, 58, 0.08);
        border: 1px solid rgba(232, 93, 58, 0.2);
        border-radius: var(--radius-md);
        color: var(--color-accent);
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .hero__title {
          font-size: 2.25rem;
        }

        .preview-section__actions {
          flex-direction: column;
          align-items: flex-start;
        }

        .hero__actions {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  cats: CatImage[] = [];
  loading = true;
  refreshing = false;
  error = '';

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.catService.getPreviewImages(1).subscribe({
      next: (data) => {
        this.cats = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar as imagens. Tente novamente.';
        this.loading = false;
      },
    });
  }

  refreshImages(): void {
    this.refreshing = true;
    this.error = '';
    this.catService.refreshPreviewImages(1).subscribe({
      next: (data) => {
        const newCat = data[0];
        if (!newCat) { this.refreshing = false; return; }
        const img = new Image();
        img.onload = () => { this.cats = data; this.refreshing = false; };
        img.onerror = () => { this.cats = data; this.refreshing = false; };
        img.src = newCat.url;
      },
      error: () => {
        this.error = 'Não foi possível carregar as imagens. Tente novamente.';
        this.refreshing = false;
      },
    });
  }
}
