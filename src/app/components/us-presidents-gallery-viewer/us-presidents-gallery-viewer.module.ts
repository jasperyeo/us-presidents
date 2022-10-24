
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { UsPresidentsGalleryViewerComponent } from './us-presidents-gallery-viewer.component';
import { ListViewerComponent } from './list-viewer/list-viewer.component';
import { IntroDialogComponent } from './intro-dialog/intro-dialog.component';

@NgModule({
  declarations: [
    UsPresidentsGalleryViewerComponent,
    ListViewerComponent,
    IntroDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UsPresidentsGalleryViewerComponent,
    ListViewerComponent,
    IntroDialogComponent
  ]
})
export class UsPresidentsGalleryViewerModule {}