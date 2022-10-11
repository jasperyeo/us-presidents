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
        const lifeIndexStart: number = rawText.indexOf('>(', nameIndexEnd);
        const lifeIndexEnd: number = rawText.indexOf(')', lifeIndexStart);
        let life: string = rawText.substring(lifeIndexStart + 1, lifeIndexEnd + 1);
        if (life.length > 11) {
          life = '(b. ' + rawText.substring(lifeIndexEnd - 4, lifeIndexEnd + 1);
        }
        const termStartIndexStart: number = rawText.indexOf('white-space', lifeIndexEnd);
        const termStartIndexEnd: number = rawText.indexOf('<', termStartIndexStart);
        const termStart: string = rawText.substring(rawText.indexOf('>', termStartIndexStart + ('white-space').length) + 1, termStartIndexEnd);
        const termEndIndexStart: number = rawText.indexOf('white-space', termStartIndexEnd);
        const termEndIndexEnd: number = rawText.indexOf('<', termEndIndexStart);
        const termEnd: string = rawText.substring(rawText.indexOf('>', termEndIndexStart + ('white-space').length) + 1, termEndIndexEnd);
        this.presidents.push({
          rawText: rawText,
          sNo: i + 1,
          name: name,
          life: life,
          termStart: termStart,
          termEnd: i === count - 1 ? '-' : termEnd
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