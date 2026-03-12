export interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  life_span: string;
  wikipedia_url?: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreed[];
}
