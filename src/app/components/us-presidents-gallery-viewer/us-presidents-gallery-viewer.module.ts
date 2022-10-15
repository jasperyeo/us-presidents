
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { UsPresidentsGalleryViewerComponent } from './us-presidents-gallery-viewer.component';
import { ListViewerComponent } from './list-viewer/list-viewer.component';

@NgModule({
  declarations: [
    UsPresidentsGalleryViewerComponent,
    ListViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UsPresidentsGalleryViewerComponent,
    ListViewerComponent
  ]
})
export class UsPresidentsGalleryViewerModule {}