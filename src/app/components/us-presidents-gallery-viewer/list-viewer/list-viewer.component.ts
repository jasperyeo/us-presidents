import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-viewer',
  templateUrl: './list-viewer.component.html',
  styleUrls: ['./list-viewer.component.scss']
})
export class ListViewerComponent {

  @Input('data') public data: any[] = [];
  @Input('mobileView') public mobileView: boolean = false;

  constructor() { }

}
