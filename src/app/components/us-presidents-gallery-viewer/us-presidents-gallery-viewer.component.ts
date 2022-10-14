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
      this._extract(htmlString);
      console.log(this.presidents);
    })
    .catch(error => {
      console.error('API failed');
    });
  }

  private extractContent(s: string): string {
    let span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  private _extract(htmlString: string): void {
    let trText: string[] | null = htmlString.match(/<tr>[\s\S]*?<\/tr>/g);
    if (trText) {
      trText.splice(0, 1);
      console.log(trText);
      trText.forEach((tr: string, index: number) => {
        const rawText: string = tr;
        let tdText: string[] | null = rawText.match(/<td[\s\S]*?<\/td>/g);
        let name: string = '-', birthDeath: string = '-', term: string = '-', party: string = '-', election: string = '-';
        if (tdText) {
          tdText = tdText.map(td => this.extractContent(td));
          tdText = tdText.filter(td => td && td.length);
          name = tdText[0].substring(0, tdText[0].indexOf('('));
          birthDeath = tdText[0].substring(tdText[0].indexOf('('), tdText[0].indexOf(')') + 1);
          term = tdText[1];
          party = tdText[2];
          election = tdText[3];
        }
        this.presidents.push({
          rawText: rawText,
          textPerCell: tdText,
          sNo: index + 1,
          name: name,
          life: birthDeath,
          term: term,
          party: party,
          election: election
        });
      });
    }
  }
}
