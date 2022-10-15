import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UsPresidentsGalleryViewerModule } from './components/us-presidents-gallery-viewer/us-presidents-gallery-viewer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UsPresidentsGalleryViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
