import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/us-presidents-gallery-viewer/us-presidents-gallery-viewer.component').then(m => m.UsPresidentsGalleryViewerComponent)
  }
];