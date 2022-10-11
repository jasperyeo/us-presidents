
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { UsPresidentsGalleryViewerComponent } from './us-presidents-gallery-viewer.component';

@NgModule({
  declarations: [
    UsPresidentsGalleryViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UsPresidentsGalleryViewerComponent
  ]
})
export class UsPresidentsGalleryViewerModule {}