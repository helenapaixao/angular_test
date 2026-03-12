import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CatImage, CatBreed } from '../models/cat.model';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private readonly apiUrl = 'https://api.thecatapi.com/v1';
  previewCache: CatImage[] = [];

  constructor(private http: HttpClient) {}

  getImages(limit = 12, breedId = ''): Observable<CatImage[]> {
    const breedParam = breedId ? `&breed_ids=${breedId}` : '';
    return this.http.get<CatImage[]>(
      `${this.apiUrl}/images/search?limit=${limit}&has_breeds=1${breedParam}`
    );
  }

  getPreviewImages(limit = 6): Observable<CatImage[]> {
    if (this.previewCache.length > 0) {
      return of(this.previewCache);
    }
    return this.http
      .get<CatImage[]>(`${this.apiUrl}/images/search?limit=${limit}&has_breeds=1`)
      .pipe(tap((data) => (this.previewCache = data)));
  }

  refreshPreviewImages(limit = 6): Observable<CatImage[]> {
    this.previewCache = [];
    return this.getPreviewImages(limit);
  }

  getBreeds(): Observable<CatBreed[]> {
    return this.http.get<CatBreed[]>(`${this.apiUrl}/breeds`);
  }
}
