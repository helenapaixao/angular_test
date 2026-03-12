import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatService } from '../../services/cat.service';
import { CatImage, CatBreed } from '../../models/cat.model';

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="cats-page">
      <div class="container">
        <div class="page-header">
          <h1 class="section-title">Gatos</h1>
          <p class="page-header__subtitle">
            Seleciona uma raça para ver uma imagem.
          </p>
        </div>

        <div class="controls">
          <div class="controls__select-wrapper">
            <select
              class="controls__select"
              [(ngModel)]="selectedBreedId"
              (ngModelChange)="onBreedChange($event)"
              [disabled]="loadingBreeds"
            >
              <option value="">Todas as raças</option>
              @for (breed of breeds; track breed.id) {
                <option [value]="breed.id">{{ breed.name }}</option>
              }
            </select>
          </div>
          <button
            class="btn btn--outline btn--refresh"
            (click)="loadImage()"
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

        @if (loading) {
          <div class="cat-single">
            <div class="skeleton-card">
              <div class="skeleton skeleton--image"></div>
            </div>
          </div>
        }

        @if (!loading && !error && cat) {
          <div class="cat-single">
            <article class="cat-card">
              <div class="cat-card__img-wrapper">
                <img
                  [src]="cat.url"
                  [alt]="cat.breeds.length > 0 ? cat.breeds[0].name : 'Gato'"
                  class="cat-card__img"
                />
                @if (refreshing) {
                  <div class="cat-card__overlay">
                    <span class="spinner-lg"></span>
                  </div>
                }
              </div>
              @if (cat.breeds.length > 0) {
                <div class="cat-card__label">{{ cat.breeds[0].name }}</div>
              }
            </article>
          </div>

          @if (activeBreed) {
            <div class="info-card">
              <div class="info-card__header">
                <h2 class="info-card__name">{{ activeBreed.name }}</h2>
                <span class="info-card__origin">{{ activeBreed.origin }}</span>
              </div>
              <p class="info-card__desc">{{ activeBreed.description }}</p>
              <div class="info-card__tags">
                @for (tag of getTemperamentTags(); track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
              <div class="info-card__meta">
                <div class="info-card__meta-item">
                  <span class="info-card__meta-label">Esperança de vida</span>
                  <span class="info-card__meta-value">{{ activeBreed.life_span }} anos</span>
                </div>
              </div>
            </div>
          }
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
      .cats-page {
        padding: 3rem 0 5rem;
        min-height: calc(100vh - 72px);
      }

      .page-header {
        margin-bottom: 2rem;
      }

      .page-header__subtitle {
        color: var(--color-text-muted);
        font-size: 0.95rem;
        margin-top: -0.5rem;
        max-width: 540px;
      }

      /* Controls */
      .controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }

      .controls__select-wrapper {
        width: 100%;
        max-width: 300px;
      }

      .btn--refresh {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        white-space: nowrap;
        padding: 0.6rem 1.1rem;
        font-size: 0.88rem;
        font-weight: 600;
        border-radius: var(--radius-sm);
        transition: all var(--transition-fast);
        cursor: pointer;
        font-family: var(--font-body);
        background: transparent;
        color: var(--color-text-muted);
        border: 1px solid var(--color-border);
      }

      .btn--refresh:hover:not(:disabled) {
        color: var(--color-text);
        border-color: var(--color-text-muted);
      }

      .btn--refresh:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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

      .controls__select {
        width: 100%;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        color: var(--color-text);
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
        font-family: var(--font-body);
        cursor: pointer;
        transition: border-color var(--transition-fast);
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        padding-right: 2.5rem;
      }

      .controls__select:focus {
        outline: none;
        border-color: var(--color-accent);
      }

      .controls__select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Single photo */
      .cat-single {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
      }

      .cat-card {
        width: 100%;
        max-width: 480px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
        animation: fadeInUp 0.4s ease-out both;
      }

      .cat-card__img-wrapper {
        width: 100%;
        padding-top: 85%;
        position: relative;
        background: var(--color-surface-hover);
      }

      .cat-card__img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .cat-card__overlay {
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

      .cat-card__label {
        padding: 0.6rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-accent);
        font-family: var(--font-mono);
        text-align: center;
      }

      /* Info card */
      .info-card {
        max-width: 480px;
        margin: 0 auto;
        background: var(--color-surface);
        border: 1px solid var(--color-accent);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        animation: fadeInUp 0.3s ease-out;
      }

      .info-card__header {
        display: flex;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: 0.75rem;
      }

      .info-card__name {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-text);
      }

      .info-card__origin {
        font-size: 0.8rem;
        color: var(--color-accent);
        font-family: var(--font-mono);
      }

      .info-card__desc {
        color: var(--color-text-muted);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .info-card__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 0.75rem;
      }

      .tag {
        background: var(--color-accent-soft);
        color: var(--color-accent);
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .info-card__meta {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
      }

      .info-card__meta-label {
        display: block;
        font-size: 0.7rem;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.2rem;
      }

      .info-card__meta-value {
        font-size: 0.9rem;
        color: var(--color-text);
        font-weight: 500;
      }

      .info-card__empty {
        color: var(--color-text-muted);
        font-size: 0.9rem;
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
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
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
        .cat-card,
        .skeleton-card,
        .info-card {
          max-width: 100%;
        }

        .controls {
          flex-direction: column;
          align-items: stretch;
        }

        .controls__select-wrapper {
          max-width: 100%;
        }
      }
    `,
  ],
})
export class CatsComponent implements OnInit {
  cat: CatImage | null = null;
  breeds: CatBreed[] = [];
  selectedBreedId = '';
  selectedBreed: CatBreed | null = null;
  loading = true;
  loadingBreeds = true;
  refreshing = false;
  error = '';

  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.loadBreeds();
    this.loadImage();
  }

  loadBreeds(): void {
    this.catService.getBreeds().subscribe({
      next: (data) => {
        this.breeds = data;
        this.loadingBreeds = false;
      },
      error: () => {
        this.loadingBreeds = false;
      },
    });
  }

  loadImage(): void {
    const isInitial = !this.cat;
    if (isInitial) {
      this.loading = true;
    } else {
      this.refreshing = true;
    }
    this.error = '';
    this.catService.getImages(1, this.selectedBreedId).subscribe({
      next: (data) => {
        const newCat = data[0] ?? null;
        if (isInitial || !newCat) {
          this.cat = newCat;
          this.loading = false;
          this.refreshing = false;
        } else {
          const img = new Image();
          img.onload = () => {
            this.cat = newCat;
            this.refreshing = false;
          };
          img.onerror = () => {
            this.cat = newCat;
            this.refreshing = false;
          };
          img.src = newCat.url;
        }
      },
      error: () => {
        this.error = 'Não foi possível carregar a imagem. Tente novamente.';
        this.loading = false;
        this.refreshing = false;
      },
    });
  }

  onBreedChange(breedId: string): void {
    this.selectedBreed = this.breeds.find((b) => b.id === breedId) ?? null;
    this.loadImage();
  }

  get activeBreed(): CatBreed | null {
    return this.selectedBreed ?? (this.cat?.breeds?.[0] ?? null);
  }

  getTemperamentTags(): string[] {
    if (!this.activeBreed) return [];
    return this.activeBreed.temperament.split(',').map((t) => t.trim());
  }
}
