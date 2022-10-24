import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly title: string = 'U.S. Presidents | Jasper Yeo';

  constructor(private _title: Title) {
    this._title.setTitle(this.title);
  }
}
