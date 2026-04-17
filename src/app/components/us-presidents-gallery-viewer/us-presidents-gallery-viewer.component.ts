import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { combineLatestWith } from 'rxjs';
import { UsPresidentsGalleryViewerService } from './us-presidents-gallery-viewer.service';
import { ListViewerComponent } from './list-viewer/list-viewer.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ListViewerComponent
  ],
  selector: 'us-presidents-gallery-viewer',
  templateUrl: './us-presidents-gallery-viewer.component.html',
  styleUrls: ['./us-presidents-gallery-viewer.component.scss'],
})
export class UsPresidentsGalleryViewerComponent {
  public result: WritableSignal<any[]> = signal<any[]>([]);
  public media: WritableSignal<any[]> = signal<any[]>([]);
  public presidents: WritableSignal<any[]> = signal<any[]>([]);

  constructor(private _usPresidentsGalleryViewerService: UsPresidentsGalleryViewerService) {
    const article$ = this._usPresidentsGalleryViewerService.getWikipediaArticle();
    const mediaList$ = this._usPresidentsGalleryViewerService.getMediaList();

    mediaList$.pipe(combineLatestWith(article$))
    .subscribe({
      next: (result) => {
        this.media.set(result[0].items);
        this.result.set(result[1]);
        this._parseResult();
      },
      error: (error) => {
        console.error('API failed', error);
      }
    });
  }

  private _parseResult(): void {
    // remove the first element of the array which is the table header
    this.result.update(result => {
      result[0].shift();
      return result[0];
    });
    this.media.update(media => {
      media.shift();
      return media;
    });
    // count unique instances
    const counts = this.result().map(row => row[0]).reduce((acc: { [key: number]: number }, row) => {
      acc[row] = (acc[row] || 0) + 1;
      return acc;
    }, {});
    // filter media list to only include images of presidents
    this.media.update(media => {
      return media.map(item => 'https://' + (item.srcset[0]?.src as string)?.substring(2));
    });
    // iterate through the result and push the data to the presidents array
    // console.log(this.result());
    this.result().forEach((row: any, index: number) => {
      const vicePresident: string = (row[7] as string)
        .replace('through', 'through ')
        .replace('through outp', 'throughout p')
        .replace('after', 'after ')
        .replace(':', ': ');
      const name: string = (row[2] as string)
        .replace('(', '\n(')
        .replace(')', ')\n');
      this.presidents.update(presidents => {
        return [...presidents, {
          count: counts[row[0]],
          isCollapsed: index > 0 && row[0] === this.result()[index - 1][0],
          sNo: row[0],
          imagePath: this.media()[row[0] - 1],
          name: name,
          term: row[3],
          party: row[5],
          election: row[6],
          vicePresident: vicePresident,
          parties: [],
          elections: [],
          vicePresidents: []
        }];
      });
    });
    let currentIndex: number = 0;
    this.presidents().forEach((president: any, index: number) => {
      if (!president.isCollapsed) {
        currentIndex = index;
      }
      this.presidents.update(presidents => {
        const updatedPresidents = [...presidents];
        updatedPresidents[currentIndex].parties.push(president.party);
        updatedPresidents[currentIndex].elections.push(president.election);
        updatedPresidents[currentIndex].vicePresidents.push(president.vicePresident);
        return updatedPresidents;
      });
    });
    // console.log(this.presidents());
  }

  public refresh(): void {
    location.reload();
  }
}
