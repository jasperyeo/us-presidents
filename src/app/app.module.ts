import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UsPresidentsGalleryViewerModule } from './components/us-presidents-gallery-viewer/us-presidents-gallery-viewer.module';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        UsPresidentsGalleryViewerModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
