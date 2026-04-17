import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsPresidentsGalleryViewerComponent } from './components/us-presidents-gallery-viewer/us-presidents-gallery-viewer.component';

@Component({
  selector: 'app-root',
  imports: [
    UsPresidentsGalleryViewerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public readonly title: string = 'U.S. Presidents | Jasper Yeo';

  constructor(private _title: Title) {
    this._title.setTitle(this.title);
  }
}
