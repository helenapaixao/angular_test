import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatsComponent } from './pages/cats/cats.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
