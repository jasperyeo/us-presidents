import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'intro-dialog',
  templateUrl: './intro-dialog.component.html',
  styleUrls: ['./intro-dialog.component.scss']
})
export class IntroDialogComponent implements OnInit {

  @Output('onDialogClose') public onDialogClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  public currentYear: number = 2022;

  constructor() {}

  public ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  public closeDialog(): void {
    this.onDialogClose.emit(true);
  }
}
