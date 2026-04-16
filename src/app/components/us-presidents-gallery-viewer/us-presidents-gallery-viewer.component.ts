import { Component } from '@angular/core';
import { UsPresidentsGalleryViewerService } from './us-presidents-gallery-viewer.service';
import { combineLatestWith } from 'rxjs';

@Component({
    selector: 'us-presidents-gallery-viewer',
    templateUrl: './us-presidents-gallery-viewer.component.html',
    styleUrls: ['./us-presidents-gallery-viewer.component.scss'],
    standalone: false
})
export class UsPresidentsGalleryViewerComponent {
  public result: any[] = [];
  public media: any[] = [];
  public presidents: any[] = [];
  public mobileView: boolean = false;

  constructor(private _usPresidentsGalleryViewerService: UsPresidentsGalleryViewerService) {
    const article$ = this._usPresidentsGalleryViewerService.getWikipediaArticle();
    const mediaList$ = this._usPresidentsGalleryViewerService.getMediaList();

    mediaList$.pipe(combineLatestWith(article$))
    .subscribe({
      next: (result) => {
        this.media = result[0].items;
        this.result = result[1];
        this._parseResult();
      },
      error: (error) => {
        console.error('API failed', error);
      }
    });
  }

  private _parseResult(): void {
    // remove the first element of the array which is the table header
    this.result = this.result[0];
    this.result.shift();
    this.media.shift();
    // count unique instances
    const counts = this.result.map(row => row[0]).reduce((acc: { [key: number]: number }, row) => {
      acc[row] = (acc[row] || 0) + 1;
      return acc;
    }, {});
    // filter media list to only include images of presidents
    this.media = this.media.map(item => 'https://' + (item.srcset[0]?.src as string)?.substring(2));
    // iterate through the result and push the data to the presidents array
    console.log(this.result);
    this.result.forEach((row: any, index: number) => {
      const vicePresident: string = (row[7] as string)
        .replace('through', 'through ')
        .replace('through outp', 'throughout p')
        .replace('after', 'after ')
        .replace(':', ': ');
      const name: string = (row[2] as string)
        .replace('(', '\n(')
        .replace(')', ')\n');
      this.presidents.push({
        count: counts[row[0]],
        isCollapsed: index > 0 && row[0] === this.result[index - 1][0],
        sNo: row[0],
        imagePath: this.media[row[0] - 1],
        name: name,
        term: row[3],
        party: row[5],
        election: row[6],
        vicePresident: vicePresident,
        parties: [],
        elections: [],
        vicePresidents: []
      });
    });
    let currentIndex: number = 0;
    this.presidents.forEach((president: any, index: number) => {
      if (!president.isCollapsed) {
        currentIndex = index;
      }
      this.presidents[currentIndex].parties.push(president.party);
      this.presidents[currentIndex].elections.push(president.election);
      this.presidents[currentIndex].vicePresidents.push(president.vicePresident);
    });
    console.log(this.presidents);
  }

  public refresh(): void {
    location.reload();
  }
}
