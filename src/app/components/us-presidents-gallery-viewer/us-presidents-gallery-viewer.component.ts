import { Component } from '@angular/core';

import { UsPresidentsGalleryViewerService } from './us-presidents-gallery-viewer.service';

@Component({
  selector: 'us-presidents-gallery-viewer',
  templateUrl: './us-presidents-gallery-viewer.component.html',
  styleUrls: ['./us-presidents-gallery-viewer.component.scss']
})
export class UsPresidentsGalleryViewerComponent {
  public presidents: any[] = [];
  public readonly searchTerm: string = 'list_of_us_presidents';

  constructor(private _usPresidentsGalleryViewerService: UsPresidentsGalleryViewerService) {
    this._usPresidentsGalleryViewerService.getWikipediaArticle(this.searchTerm).then((result) => {
      const htmlString: string = result as string;
      const count: number = (htmlString.match(/<th scope="row">/g) || []).length;
      let indexStart: number = htmlString.indexOf('<th scope="row">', 0);
      let indexEnd: number = htmlString.indexOf('</tr>', indexStart);
      for (let i: number = 0; i < count; i++) {
        const rawText: string = htmlString.substring(indexStart, indexEnd);
        const nameIndexStart: number = rawText.indexOf('of ', 0);
        const nameIndexEnd: number = rawText.indexOf('"', nameIndexStart + ('of ').length);
        const name: string = rawText.substring(nameIndexStart + ('of ').length, nameIndexEnd);
        const birthIndexStart: number = rawText.indexOf('nowrap">', nameIndexEnd);
        const birthIndexEnd: number = rawText.indexOf('</span>', birthIndexStart);
        const birth: string = rawText.substring(birthIndexStart + ('nowrap">').length, birthIndexEnd);
        this.presidents.push({
          rawText: rawText,
          sNo: i + 1,
          name: name,
          birth: birth
        });
        indexStart = htmlString.indexOf('<th scope="row">', indexEnd);
        indexEnd = htmlString.indexOf('</tr>', indexStart);
      }
      console.log(this.presidents);
    })
    .catch(error => {

    });
  }
}
