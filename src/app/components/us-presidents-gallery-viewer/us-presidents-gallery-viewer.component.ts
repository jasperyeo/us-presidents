import { Component } from '@angular/core';
import { UsPresidentsGalleryViewerService } from './us-presidents-gallery-viewer.service';

@Component({
    selector: 'us-presidents-gallery-viewer',
    templateUrl: './us-presidents-gallery-viewer.component.html',
    styleUrls: ['./us-presidents-gallery-viewer.component.scss'],
    standalone: false
})
export class UsPresidentsGalleryViewerComponent {
  public result: any[] = [];
  public presidents: any[] = [];
  public mobileView: boolean = false;

  constructor(private _usPresidentsGalleryViewerService: UsPresidentsGalleryViewerService) {
    this._usPresidentsGalleryViewerService.getWikipediaArticle().then((result) => {
      this.result = result;
      this._parseResult();
    })
    .catch(error => {
      console.error('API failed');
    });
  }

  private _parseResult(): void {
    // remove the first element of the array which is the table header
    this.result = this.result[0];
    this.result.shift();
    // iterate through the result and push the data to the presidents array
    this.result.forEach((row: any, index: number) => {
      this.presidents.push({
        sNo: row[0],
        imagePath: row[1],
        name: row[2],
        term: row[3],
        party: [row[5]],
        election: row[6],
        vicePresident: row[7]
      });
    });
  }

  public refresh(): void {
    location.reload();
  }
}
