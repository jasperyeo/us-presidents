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
  public mobileView: boolean = false;

  constructor(private _usPresidentsGalleryViewerService: UsPresidentsGalleryViewerService) {
    this._usPresidentsGalleryViewerService.getWikipediaArticle(this.searchTerm).then((result) => {
      const htmlString: string = result as string;
      this._extract(htmlString);
    })
    .catch(error => {
      console.error('API failed');
    });
  }

  private _appendSpace(s: string): string {
    return s.replace(/after/g, 'after ').replace(/throughout/g, 'through').replace(/through/g, 'through ').replace(/:/g, ': ').replace(/\n\n/g, '\n');
  }

  private _extractContent(s: string): string {
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
        let name: string = '-', birthDeath: string = '-', term: string = '-', party: string[] = [], election: string = '-', vicePresident: string = '-', imagePath: string = '';
        if (tdText) {
          tdText = tdText.map(td => {
            const imagePaths: string[] | null = td.match(/src="[\s\S]*?g"/g);
            if (imagePaths) {
              imagePath = imagePaths[0].substring(5, imagePaths[0].length - 1);
            }
            return this._extractContent(td.replace(/\[[\s\S]*?\]/g, ''));
          });
          tdText = tdText.filter(td => td && td.length).map(td => this._appendSpace(td));
          name = tdText[0].substring(0, tdText[0].indexOf('('));
          birthDeath = tdText[0].substring(tdText[0].indexOf('('), tdText[0].indexOf(')') + 1);
          term = tdText[1];
          party = tdText[2].split('\n').filter(party => party && party.length);
          election = tdText[3];
          vicePresident = tdText[4];
        }
        this.presidents.push({
          rawText: rawText,
          textPerCell: tdText,
          sNo: index + 1,
          imagePath: imagePath,
          name: name,
          life: birthDeath,
          term: term,
          party: party,
          election: election,
          vicePresident: vicePresident
        });
      });
    }
  }

  public refresh(): void {
    location.reload();
  }
}
